import {UserSession} from 'blockstack';
import update from 'immutability-helper';
import React, {Component, ReactElement} from 'react';
import {RefreshCw, DownloadCloud} from 'react-feather';
import { Textfit } from 'react-textfit';
import Hotkeys from 'react-hot-keys';

import Player from './Player';
import SideNav from './SideNav';
import {DEFAULT_SETTINGS, EpisodeReference, Feeds, Playing, Settings, View} from './types';
import {loadData, requestPodcast, saveData} from './utils';
import EpisodeView from './views/EpisodeView';
import FeedsView from './views/FeedsView';
import FeedView from './views/FeedView';
import SearchView from './views/SearchView';
import SettingsView from './views/SettingsView';
import AudioPlayer from './AudioPlayer';

import './index.scss';

const FEEDS_FILENAME = 'feeds.json';
const SETTINGS_FILENAME = 'settings.json';
const PLAYING_FILENAME = 'playing.json';

interface Props {
  userSession: UserSession;
  signOut: () => (void);
}

interface State {
  feeds: Feeds;
  view: View;
  viewing: string | EpisodeReference | undefined;
  settings: Settings;
  sidenavOpen: boolean;
}

export default class Dashboard extends Component<Props, State> {
  saveTimer: NodeJS.Timer | null = null;

  audioPlayer: AudioPlayer;

  constructor(props: Props) {
    super(props);

    this.state = {
      // Main State
      feeds: {},
      settings: DEFAULT_SETTINGS,
      view: View.Feeds,
      viewing: undefined,
      sidenavOpen: false
    };

    this.refresh = this.refresh.bind(this);
    this.addFeed = this.addFeed.bind(this);
    this.openEpisode = this.openEpisode.bind(this);
    this.playEpisode = this.playEpisode.bind(this);
    this.deleteFeed = this.deleteFeed.bind(this);
    this.updateSettings = this.updateSettings.bind(this);
    this.sync = this.sync.bind(this);

    this.audioPlayer = new AudioPlayer(
      // Callback to refresh dashboard. Possibly hackier than it needs to be.
      () => this.setState({}),
      playing => this.savePlaying(playing),
      this.state.settings.seekAmount
    );
  }

  render() {
    return (
      <Hotkeys
        keyName='*'
        onKeyDown={(_key, e, _handle) => this.handleKey(e.key)}
      >
        <div className='dashboard'>
          <div className='titlebar'>
            <SideNav
              open={this.state.sidenavOpen}
              feeds={this.state.feeds}
              openHome={() => this.setState({view: View.Feeds, sidenavOpen: false})}
              openFeed={viewing => this.setState({view: View.Viewing, viewing, sidenavOpen: false})}
              openSettings={() => this.setState({view: View.Settings, sidenavOpen: false})}
              openSearch={() => this.setState({view: View.Search, sidenavOpen: false})}
              changeState={open => this.setState({sidenavOpen: open})}
              signOut={this.props.signOut}
            />
            <div className='title'>
              <Textfit>
                <p className='title-text'>{this.title()}</p>
              </Textfit>
            </div>
            <div className='resync-button' title='Redownload podcast data'>
              <DownloadCloud onClick={this.sync} />
            </div>
            <div className='refresh-button' title='Refresh the feeds'>
              <RefreshCw onClick={this.refresh} />
            </div>
          </div>
          <div className='main'>{this.inner()}</div>
          <Player
            {...this.state}
            {...this}
          />
        </div>
      </Hotkeys>
    );
  }

  handleKey(key: string) {
    const {toggle, seekBackwards, seekForwards, seekAmount} = this.state.settings;

    if (key === toggle) {
      this.audioPlayer.toggle();
    }

    if (key === seekBackwards) {
      this.audioPlayer.seekRelative(-seekAmount);
    }

    if (key === seekForwards) {
      this.audioPlayer.seekRelative(+seekAmount);
    }
  }

  updateSettings(updates: Partial<Settings>, valid: boolean) {
    this.setState(
      {settings: update(this.state.settings, {$merge: updates})},
      () => (valid ? this.saveSettings() : null)
    );
  }

  title(): string {
    const {view, viewing, feeds} = this.state;

    if (view === View.Feeds) {
      return 'Podcasts';
    } if (view === View.Settings) {
      return 'Settings';
    } if (view === View.Search) {
      return 'Search';
    } if (view === View.Viewing) {
      if (typeof viewing === 'string') {
        return feeds[viewing].data.meta.title;
      } if (typeof viewing !== 'undefined') {
        return viewing.episode.title;
      }
      console.error('View set to viewing but this.state.viewing is undefined');
      return '';
    }
    console.log(`View ${view} not handled in title()`);
    return '';
  }

  inner(): ReactElement | ReactElement[] {
    const {feeds, view, viewing, settings} = this.state;

    if (view === View.Feeds) {
      return (
        <FeedsView
          feeds={feeds}
          openFeed={feed => this.setState({viewing: feed, view: View.Viewing})}
          {...this}
        />
      );
    } if (view === View.Settings) {
      return (
        <SettingsView
          settings={settings}
          updateSettings={this.updateSettings}
        />
      );
    } if (view === View.Viewing) {
      if (typeof viewing === 'string') {
        return (
          <FeedView
            feeds={feeds}
            {...this}
            feedUrl={viewing}
          />
        );
      } if (typeof viewing !== 'undefined') {
        return (
          <EpisodeView
            epRef={viewing}
            {...this.state}
            {...this}
          />
        );
      }
      const error = 'View set to viewing but this.state.viewing is undefined';
      console.error(error);
      return <p>{error}</p>;
    } if (view === View.Search) {
      return (
        <SearchView
          feeds={feeds}
          {...this}
        />
      );
    }
    const error = `View ${view} not handled in inner()`;
    console.error(error);
    return <p>{error}</p>;
  }

  playEpisode(epRef: EpisodeReference) {
    const {feeds} = this.state;
    this.audioPlayer.loadEp(epRef, feeds, true, 0);
  }

  async refresh() {
    await Promise.all(Object.keys(this.state.feeds).map(this.addFeed));
    this.saveFeeds();
  }

  deleteFeed(url: string) {
    const feeds = update(
      this.state.feeds,
      {$unset: [url]}
    );

    this.setState({feeds}, this.saveFeeds);
  }

  openEpisode(viewing: EpisodeReference) {
    this.setState({viewing, view: View.Viewing});
  }

  clearFeeds() {
    this.setState({feeds: {}}, this.saveFeeds);
  }

  async addFeed(url: string) {
    return requestPodcast(this.state.settings.corsProxy, url)
      .then(data => {
        const feeds = update(
          this.state.feeds,
          { $merge: {[url]: {time: Date.now(), data}} }
        );
        return this.setState({feeds});
      })
      .then(() => this.saveFeeds());
  }

  saveFeeds() {
    saveData(this.props.userSession, FEEDS_FILENAME, this.state.feeds);
  }

  saveSettings() {
    saveData(this.props.userSession, SETTINGS_FILENAME, this.state.settings);
  }

  savePlaying(playing: Playing | undefined) {
    saveData(this.props.userSession, PLAYING_FILENAME, playing);
  }

  sync() {
    const {userSession} = this.props;

    loadData<Feeds>(userSession, FEEDS_FILENAME)
      .then(feeds => this.setState({feeds}))
      .then(() => loadData<Playing | undefined>(userSession, PLAYING_FILENAME))
      .then(playing => {
        if (playing) {
          const {feeds} = this.state;
          this.audioPlayer.loadEp(playing.epRef, feeds, false, playing.time);
        }
      });

    loadData<Settings>(userSession, SETTINGS_FILENAME)
      .then(settings => this.setState({
        // Merge in settings (convenient because it allows me to update whats in settings)
        settings: update(this.state.settings, {$merge: settings})
      }));
  }

  componentDidMount() {
    this.sync();
  }
}
