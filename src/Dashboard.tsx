import {UserSession} from 'blockstack';
import update from 'immutability-helper';
import React, {Component, ReactElement} from 'react';
import {RefreshCw} from 'react-feather';
import SideNav from './SideNav';
import {EpisodeReference, Feeds, Playing, View} from './types';
import {loadData, requestPodcast, saveData} from './utils';

import EpisodeItem from './EpisodeItem';
import Player from './Player';
import EpisodeView from './views/EpisodeView';
import Main from './views/Main';
import Search from './views/Search';

import { Textfit } from 'react-textfit';

const FEEDS_FILENAME = 'feeds.json';

interface Props {
  userSession: UserSession;
  signOut: () => (void);
}

interface Settings {
  corsProxy: string;
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
  constructor(props: Props) {
    super(props);

    this.state = {
      // Main State
      feeds: {},
      settings: {
        corsProxy: 'https://caster-cors-proxy.herokuapp.com',
      },
      view: View.Main,
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
  }

  render() {
    return (
      <div className='dashboard'>
        <div className='titlebar'>
          <SideNav
            open={this.state.sidenavOpen}
            feeds={this.state.feeds}
            openHome={() => this.setState({view: View.Main, sidenavOpen: false})}
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

  updatePlaying(updates: object) {
    if (this.state.playing === undefined) {
      return;
    }

    const playing = update(this.state.playing, {$merge: updates});
    this.setState({playing});
  }

  title(): string {
    const {view, viewing, feeds} = this.state;

    if (view === View.Main) {
      return 'Podcasts';
    } else if (view === View.Settings) {
      return 'Settings';
    } else if (view === View.Search) {
      return 'Search';
    } else if (view === View.Viewing) {
      if (typeof viewing === 'string') {
        return feeds[viewing].data.meta.title;
      } else if (typeof viewing !== 'undefined') {
        return viewing.episode.title;
      } else {
        console.error('View set to viewing but this.state.viewing is undefined');
        return '';
      }
    } else {
      console.log(`View ${view} not handled in title()`);
      return '';
    }
  }

  inner(): ReactElement | ReactElement[] {
    const {feeds, view, playing, viewing} = this.state;

    if (view === View.Main) {
      return <Main
        feeds={feeds}
        openFeed={feed => this.setState({viewing: feed, view: View.Viewing})}
        addFeed={this.addFeed}
        deleteFeed={this.deleteFeed}
      />;
    } else if (view === View.Settings) {
      return <p>Settingssettingssettings</p>;
    } else if (view === View.Viewing) {
      if (typeof viewing === 'string') {
        const feedUrl: string = viewing;
        const feed = feeds[feedUrl].data;

        return feed.episodes.map(episode => <EpisodeItem
          key={episode.guid}
          episode={{episode, feedUrl}}
          feeds={feeds}
          openEpisode={this.openEpisode}
          playEpisode={this.playEpisode}
        />);
      } else if (typeof viewing !== 'undefined') {
        return <EpisodeView
          epRef={viewing}
          feeds={feeds}
          playEpisode={this.playEpisode}
          playing={playing}
          playingDuration={this.state.playingDuration}
          updatePlaying={this.updatePlaying}
        />;
      } else {
        const error = 'View set to viewing but this.state.viewing is undefined';
        console.error(error);
        return <p>{error}</p>;
      }
    } else if (view === View.Search) {
      return <Search
        feeds={this.state.feeds}
        openEpisode={this.openEpisode}
        playEpisode={this.playEpisode}
      />;
    } else {
      const error = `View ${view} not handled in inner()`;
      console.error(error);
      return <p>{error}</p>;
    }
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
      });
  }

  saveFeeds() {
    saveData(this.props.userSession, FEEDS_FILENAME, this.state.feeds);
  }

  componentDidMount() {
    loadData<Feeds>(this.props.userSession, FEEDS_FILENAME)
      .then(feeds => this.setState({feeds}));
  }
}
