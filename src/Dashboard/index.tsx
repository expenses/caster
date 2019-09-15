import {UserSession} from 'blockstack';
import update from 'immutability-helper';
import React, {Component, ReactElement} from 'react';
import {RefreshCw, Rss} from 'react-feather';
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
  loading: boolean;
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
      sidenavOpen: false,
      loading: false
    };

    this.refresh = this.refresh.bind(this);
    this.addFeed = this.addFeed.bind(this);
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

  openHome     = ()                => this.setState({view: View.Feeds, sidenavOpen: false});

  openSettings = ()                => this.setState({view: View.Settings, sidenavOpen: false});

  openSearch   = ()                => this.setState({view: View.Search, sidenavOpen: false});

  setSideNav   = (open: boolean)   => this.setState({sidenavOpen: open});

  openViewing = (viewing: string | EpisodeReference) => this.setState({view: View.Viewing, viewing, sidenavOpen: false});


  render() {
    const {sidenavOpen, loading} = this.state;

    // todo: consider putting loading rss feeds and blockstack data into the same button.
    // do I even need to store feed data on server?

    return (
      <Hotkeys
        keyName='*'
        onKeyDown={(_key, e) => this.handleKey(e.key)}
      >
        <div className='dashboard'>
          <div className='titlebar'>
            <SideNav
              open={sidenavOpen}
              openHome={this.openHome}
              openSettings={this.openSettings}
              openSearch={this.openSearch}
              changeState={this.setSideNav}
              signOut={this.props.signOut}
            />
            <div className='title'>
              <Textfit>
                <p className='title-text'>{this.title()}</p>
              </Textfit>
            </div>
            <div className='resync-button' title='Refresh blockstack data'>
              <RefreshCw
                onClick={this.sync}
                style={loading ? {animation: 'spin 1.5s linear infinite'} : {}}
              />
            </div>
            <div className='refresh-button' title='Update the feeds'>
              <Rss onClick={this.refresh} />
            </div>
          </div>
          <div className='main'>{this.inner()}</div>
          <Player
            {...this.state}
            openEpisode={this.openViewing}
            audioPlayer={this.audioPlayer}
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

  inner(): ReactElement {
    const {feeds, view, viewing, settings} = this.state;

    if (view === View.Feeds) {
      return (
        <FeedsView
          feeds={feeds}
          openFeed={this.openViewing}
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
            feeds={feeds}
            feedUrl={viewing}
            playEpisode={this.playEpisode}
            openEpisode={this.openViewing}
          />
        );
      } if (typeof viewing !== 'undefined') {
        return (
          <EpisodeView
            epRef={viewing}
            {...this.state}
            playEpisode={this.playEpisode}
            audioPlayer={this.audioPlayer}
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
          playEpisode={this.playEpisode}
          openEpisode={this.openViewing}
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

  async addFeed(url: string) {
    const {settings, feeds} = this.state;

    const data = await requestPodcast(settings.corsProxy, url);

    const newFeeds = update(
      feeds,
      { $merge: {[url]: {time: Date.now(), data}} }
    );

    this.setState({feeds: newFeeds}, this.saveFeeds);
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
    loadData<Settings>(this.props.userSession, SETTINGS_FILENAME)
      .then(newSettings => this.setState({
        // Merge in settings (convenient because it allows me to update whats in settings)
        settings: update(this.state.settings, {$merge: newSettings})
      }));

    this.syncFeeds();
  }

  async syncFeeds() {
    const {userSession} = this.props;

    this.setState({loading: true});

    const feedsPromise = loadData<Feeds>(userSession, FEEDS_FILENAME);
    const playingPromise = loadData<Playing | undefined>(userSession, PLAYING_FILENAME);

    // make sure we're set the feeds before setting playing
    const feeds = await feedsPromise;
    await this.setState({feeds});

    const playing = await playingPromise;

    if (playing) {
      this.audioPlayer.loadEp(playing.epRef, feeds, false, playing.time);
    }

    this.setState({loading: false});
  }

  componentDidMount() {
    this.sync();
  }
}
