import React, { Component } from 'react';
import {UserSession} from 'blockstack';
import update from 'immutability-helper';
import {requestPodcast, saveData, loadData, episodeImage} from './utils';
import SideNav from './SideNav';
import Item from './Item';
import {Feeds, Tag, Tags, View, Episode, EpisodeReference} from './types';
import moment from 'moment';
import {RefreshCw} from 'react-feather';

import EpisodeItem from './EpisodeItem';
import TextEntry from './TextEntry';
import Search from './views/Search';
import Main from './views/Main';

const FEEDS_FILENAME = 'feeds.json';
const TAGS_FILENAME = 'tags.json';

interface Props {
  userSession: UserSession;
  handleSignOut: (e: Event) => (void);
}

interface State {
  feeds: Feeds;
  tags: Tags;
  view: View;
  playing: EpisodeReference | null;
  viewing: string | EpisodeReference | undefined;


  settings: Record<string, any>;
  sidenavOpen: boolean;
}

export default class Dashboard extends Component<Props, State> {
  player: any = null;

  constructor(props: any) {
  	super(props);

  	this.state = {
      // Main State
      feeds: {},
      tags: {},
      settings: {
        corsProxy: 'https://caster-cors-proxy.herokuapp.com',
      },
      view: View.Main,
      playing: null,
      viewing: undefined,
      sidenavOpen: false
  	};

    this.refresh = this.refresh.bind(this);
    this.addFeed = this.addFeed.bind(this);
    this.openEpisode = this.openEpisode.bind(this);
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
          />
          <p>{this.title()}</p>
          <RefreshCw onClick={this.refresh} />
        </div>
        <div className={this.className()}>{this.inner()}</div>
        <div className="player"></div>
      </div>
    );
  }

  className(): string {
    if (this.state.view === View.Search) {
      return 'search';
    } else {
      return 'main';
    }
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
    let {feeds, view} = this.state;

    if (view === View.Main) {
      return <Main
        feeds={feeds}
        openFeed={viewing => this.setState({viewing, view: View.Viewing})}
        addFeed={this.addFeed}
      />;
    } else if (view === View.Settings) {
      return <p>Settingssettingssettings</p>;
    } else if (view === View.Viewing) {
      if (typeof this.state.viewing === 'string') {
        let feedUrl: string = this.state.viewing;
        let feed = feeds[feedUrl].data;

        return feed.episodes.map(episode => <EpisodeItem
          key={episode.guid}
          episode={{episode, feedUrl}}
          feeds={feeds}
          openEpisode={this.openEpisode}
        />);
      } else if (typeof this.state.viewing !== 'undefined') {
        let episode = this.state.viewing.episode;

        return <div className="episode-view">
          <h1>{episode.title}</h1>
          <img src={episodeImage(this.state.viewing, feeds)} alt=""/>
          <p dangerouslySetInnerHTML={{__html: episode.description}}></p>
        </div>;
      } else {
        console.error('View set to viewing but this.state.viewing is undefined');
      }
    } else if (view === View.Search) {
      return <Search feeds={this.state.feeds} openEpisode={this.openEpisode} />;
    } else {
      console.log(`View ${view} not handled in inner()`);
    }
  }

  async refresh() {
    await Promise.all(Object.keys(this.state.feeds).map(this.addFeed));
    this.saveFeeds();
  }

  playingString() {
    let playing = this.state.playing;

    if (!playing) {
      return '';
    } else {
      let url = playing.feedUrl;
      let guid = playing.episode.guid;

      return `${url}:${guid}`;
    }
  }

  getTags() {
    let tags = this.state.tags;
    let string = this.playingString();

    if (string && string in tags) {
      return tags[string];
    } else {
      return [];
    }
  }

  deleteTag(id: number) {
    let string = this.playingString();

    if (string) {
      let tags = update(
        this.state.tags,
        // $unset uses the delete keyword on arrays which is bad :^(
        {[string]: {$splice: [[id, 1]]}}
      );
      this.setState({tags}, this.saveTags);
    }
  }

  addTag(tag: string) {
    let string = this.playingString();

    if (!string) {
      return;
    }

    let tags = update(
      this.state.tags,
      {
        [string]: (tags: Tag[]) => update(tags || [], { $push: [{'text': tag, 'time': this.player.time()}] })
      }
    );

    this.setState({tags}, this.saveTags);
  }

  deleteUrl(url: string) {
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

  saveTags() {
    saveData(this.props.userSession, TAGS_FILENAME, this.state.tags);
  }

  componentDidMount() {
    loadData<Feeds>(this.props.userSession, FEEDS_FILENAME)
      .then(feeds => this.setState({feeds}));

    loadData<Tags>(this.props.userSession, TAGS_FILENAME)
      .then(tags => this.setState({tags}));
  }
}
