import {UserSession} from 'blockstack';
import update from 'immutability-helper';
import React, {Component, ReactElement} from 'react';
import {RefreshCw} from 'react-feather';
import { Textfit } from 'react-textfit';

import Player from './Player';
import SideNav from './SideNav';
import {DEFAULT_SETTINGS, EpisodeReference, Feeds, Playing, Settings, View} from './types';
import {loadData, requestPodcast, saveData} from './utils';
import EpisodeView from './views/EpisodeView';
import FeedsView from './views/FeedsView';
import FeedView from './views/FeedView';
import SearchView from './views/SearchView';
import SettingsView from './views/SettingsView';

import './Dashboard.scss';

const FEEDS_FILENAME = 'feeds.json';
const SETTINGS_FILENAME = 'settings.json';

interface Props {
  userSession: UserSession;
  signOut: () => (void);
}

interface State {
  feeds: Feeds;
  view: View;
  playing: Playing | undefined;
  playingDuration: number | undefined;
  viewing: string | EpisodeReference | undefined;
  settings: Settings;
  sidenavOpen: boolean;
}

export default class Dashboard extends Component<Props, State> {
  saveTimer: NodeJS.Timer | null = null;

  constructor(props: Props) {
    super(props);

    this.state = {
      // Main State
      feeds: {},
      settings: DEFAULT_SETTINGS,
      view: View.Feeds,
      playing: undefined,
      playingDuration: undefined,
      viewing: undefined,
      sidenavOpen: false
    };

    this.refresh = this.refresh.bind(this);
    this.addFeed = this.addFeed.bind(this);
    this.openEpisode = this.openEpisode.bind(this);
    this.playEpisode = this.playEpisode.bind(this);
    this.updatePlaying = this.updatePlaying.bind(this);
    this.deleteFeed = this.deleteFeed.bind(this);
    this.updateSettings = this.updateSettings.bind(this);
  }

  render() {
    return (
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
          <div className='refresh-button'>
            <RefreshCw onClick={this.refresh} />
          </div>
        </div>
        <div className='main'>{this.inner()}</div>
        <Player
          playing={this.state.playing}
          feeds={this.state.feeds}
          duration={this.state.playingDuration}
          updatePlaying={this.updatePlaying}
          setDuration={playingDuration => this.setState({playingDuration})}
        />
      </div>
    );
  }

  updateSettings(updates: object, valid: boolean) {
    this.setState(
      prevState => {
        update(prevState.settings, {$merge: updates});
      },
      () => (valid ? this.saveSettings() : null)
    );
  }

  updatePlaying(updates: object) {
    if (this.state.playing === undefined) {
      return;
    }

    this.setState(prevState => {
      update(prevState.playing, {$merge: updates});
    });
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
    const {feeds, view, playing, viewing, settings} = this.state;

    if (view === View.Feeds) {
      return (
        <FeedsView
          feeds={feeds}
          openFeed={feed => this.setState({viewing: feed, view: View.Viewing})}
          addFeed={this.addFeed}
          deleteFeed={this.deleteFeed}
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
            feedUrl={viewing}
            feeds={feeds}
            openEpisode={this.openEpisode}
            playEpisode={this.playEpisode}
          />
        );
      } if (typeof viewing !== 'undefined') {
        return (
          <EpisodeView
            epRef={viewing}
            feeds={feeds}
            playEpisode={this.playEpisode}
            playing={playing}
            playingDuration={this.state.playingDuration}
            updatePlaying={this.updatePlaying}
          />
        );
      }
      const error = 'View set to viewing but this.state.viewing is undefined';
      console.error(error);
      return <p>{error}</p>;
    } if (view === View.Search) {
      return (
        <SearchView
          feeds={this.state.feeds}
          openEpisode={this.openEpisode}
          playEpisode={this.playEpisode}
        />
      );
    }
    const error = `View ${view} not handled in inner()`;
    console.error(error);
    return <p>{error}</p>;
  }

  playEpisode(epRef: EpisodeReference) {
    this.setState({playing: {epRef, time: 0, paused: false}});
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

  componentDidMount() {
    loadData<Feeds>(this.props.userSession, FEEDS_FILENAME)
      .then(feeds => this.setState({feeds}));

    loadData<Settings>(this.props.userSession, SETTINGS_FILENAME)
      .then(settings => this.updateSettings(settings, true));
  }
}
