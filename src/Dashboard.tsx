import React, { Component } from 'react';
import {UserSession} from 'blockstack';
import update from 'immutability-helper';
import {requestPodcast, saveData, loadData} from './utils';
import SideNav from './SideNav';
import {Feeds, View, EpisodeReference, Playing} from './types';
import {RefreshCw} from 'react-feather';

import EpisodeItem from './EpisodeItem';
import Player from './Player';
import Search from './views/Search';
import Main from './views/Main';
import EpisodeView from './views/EpisodeView';

import { Textfit } from 'react-textfit';

const FEEDS_FILENAME = 'feeds.json';

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
  settings: Record<string, any>;
  sidenavOpen: boolean;
}

export default class Dashboard extends Component<Props, State> {
  constructor(props: any) {
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
      <div className="dashboard">
        <div className="titlebar">
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
          <div className="title">
              <Textfit>
              <p className="title-text">{this.title()}</p>
              </Textfit>
          </div>
          <div className="refresh-button">
            <RefreshCw onClick={this.refresh} />
          </div>
        </div>
        <div className="main">{this.inner()}</div>
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

  updatePlaying(updates: any) {
    if (this.state.playing === undefined) {
      return;
    }

    let playing = update(this.state.playing, {$merge: updates});
    this.setState({playing});
  }

  title(): string {
    let {view, viewing, feeds} = this.state;

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

  inner(): any {
    let {feeds, view, playing, viewing} = this.state;

    if (view === View.Main) {
      return <Main
        feeds={feeds}
        openFeed={viewing => this.setState({viewing, view: View.Viewing})}
        addFeed={this.addFeed}
        deleteFeed={this.deleteFeed}
      />;
    } else if (view === View.Settings) {
      return <p>Settingssettingssettings</p>;
    } else if (view === View.Viewing) {
      if (typeof viewing === 'string') {
        let feedUrl: string = viewing;
        let feed = feeds[feedUrl].data;

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
        console.error('View set to viewing but this.state.viewing is undefined');
      }
    } else if (view === View.Search) {
      return <Search
        feeds={this.state.feeds}
        openEpisode={this.openEpisode}
        playEpisode={this.playEpisode}
      />;
    } else {
      console.log(`View ${view} not handled in inner()`);
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
    let feeds = update(
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
        let feeds = update(
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
