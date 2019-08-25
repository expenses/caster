import React, { Component } from 'react';

import Browser from './Browser.js';
import PlayingInfo from './PlayingInfo.js';
import Player from './Player.js';
import PlayingImage from './PlayingImage.js';
import Settings from './Settings.js';
import TagEntry from './TagEntry.js';

import {requestPodcast, saveData, loadData} from './utils.js';
import update from 'immutability-helper';

const FEEDS_FILENAME = 'feeds.json';
const TAGS_FILENAME = 'tags.json';

export default class Dashboard extends Component {
  constructor(props) {
  	super(props);

  	this.state = {
      // Main State
      feeds: {},
      tags: {},
      settings: {
        corsProxy: 'https://caster-cors-proxy.herokuapp.com',
        toggle: 'p',
        seekBackwards: ',',
        seekForwards: '.',
        enterTag: 't',
        seekAmount: 5
      },

      // Other state

      playing: null,
      settingsOpen: false,
      message: ''
  	};

    this.addFeed = this.addFeed.bind(this);
    this.clearFeeds = this.clearFeeds.bind(this);
    this.playAudio = this.playAudio.bind(this);
    this.deleteUrl = this.deleteUrl.bind(this);
    this.addTag = this.addTag.bind(this);
    this.refresh= this.refresh.bind(this);
    this.deleteTag = this.deleteTag.bind(this);
    this.handleKey = this.handleKey.bind(this);

    this.saveFeeds = this.saveFeeds.bind(this);
  }

  render() {
    const feeds = this.state.feeds;
    const playing = this.state.playing;

    return (
      <div
        className="dashboard"
        ref={ref => this.dashboard = ref}
        onKeyDown={this.handleKey}
        tabIndex="0"
      >
        <Settings
          open={this.state.settingsOpen}
          settings={this.state.settings}
          close={() => this.setState({settingsOpen: false})}
        />
        <Browser
          feeds={feeds}
          deleteUrl={this.deleteUrl}
          play={this.playAudio}
          refresh={this.refresh}
          addFeed={url => this.addFeed(url).then(this.saveFeeds)}
          returnFocus={this.dashboard}
          settings={() => this.setState({settingsOpen: true})}
          logout={this.props.handleSignOut}
          settingsOpen={this.state.settingsOpen}
        />
        <PlayingImage playing={playing}/>
        <Player
          url={playing?.episode.enclosure.url}
          setTime={time => this.setState({time})}
          ref={ref => this.player = ref}
          settings={this.state.settings}
        />
        <PlayingInfo
          playing={playing}
          tags={this.getTags()}
          seek={(time) => this.player?.seek(time)}
          addTag={this.addTag}
          deleteTag={this.deleteTag}
          dashboard={this.dashboard}
        />
        <TagEntry
          addTag={this.addTag}
          ref={ref => this.tagentry = ref}
          returnFocus={this.dashboard}
        />
      </div>
    );
  }

  handleKey(e) {
    // No side effects such inserting a 't' into tagentry
    e.preventDefault();

    let settings = this.state.settings;

    if (e.key === settings.toggle) {
      this.player.toggle();
    }

    if (e.key === settings.seekBackwards) {
      this.player.seekBackwards();
    }

    if (e.key === settings.seekForwards) {
      this.player.seekForwards();
    }

    if (e.key === settings.enterTag) {
      this.tagentry.input.focus();
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

  deleteTag(id) {
    let string = this.playingString();

    if (string) {
      let newTags = update(
        this.state.tags,
        // $unset uses the delete keyword on arrays which is bad :^(
        {[string]: {$splice: [[id, 1]]}}
      );
      this.setState({tags: newTags}, this.saveTags);
    }
  }

  addTag(tag) {
    let string = this.playingString();

    if (!string) {
      return;
    }

    let tags = update(
      this.state.tags,
      {
        [string]: tags => update(tags || [], { $push: [{'text': tag, 'time': this.player.time()}] })
      }
    );

    this.setState({tags}, this.saveTags);
  }

  deleteUrl(url) {
    let feeds = update(
      this.state.feeds,
      {$unset: [url]}
    );

    this.setState({feeds}, this.saveFeeds);

  }

  playAudio(episode, feedUrl) {
    this.setState({playing: {'episode': episode, 'feed': this.state.feeds[feedUrl].data, 'feedUrl': feedUrl}});
  }

  clearFeeds() {
    this.setState({feeds: {}}, this.saveFeeds);
  }

  async addFeed(url) {
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
    loadData(this.props.userSession, FEEDS_FILENAME)
      .then(feeds => this.setState({feeds}));

    loadData(this.props.userSession, TAGS_FILENAME)
      .then(tags => this.setState({tags}));
  }
}
