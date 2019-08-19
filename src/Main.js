import React, { Component } from 'react';
import {
  Person,
} from 'blockstack';


import Browser from './Browser.js';
import TextEntry from './TextEntry.js';
import PlayingInfo from './PlayingInfo.js';
import Player from './Player.js';

import {requestPodcast} from './utils.js';

import merge from 'deepmerge';

const FEEDS_FILENAME = 'feeds.json';

export default class Main extends Component {
  constructor(props) {
  	super(props);

  	this.state = {
      // Main State
      feeds: {},
      tags: {},

      // Other state

      playing: null,

      tempUrl: '',
      message: '',      
      time: 0
  	};

    this.addFeed = this.addFeed.bind(this);
    this.clearFeeds = this.clearFeeds.bind(this);
    this.playAudio = this.playAudio.bind(this);
    this.deleteUrl = this.deleteUrl.bind(this);
    this.addTag = this.addTag.bind(this);
    this.refresh= this.refresh.bind(this);
  }

  render() {
    const { userSession } = this.props;

    if (userSession.isSignInPending()) {
      return null;
    }

    const feeds = this.state.feeds;
    const playing = this.state.playing;

    let image = playing ? playing.episode.image ? playing.episode.image : playing.feed.image ? playing.feed.image : null : null;

    return (
      <div className="dashboard">
        <Browser
          feeds={feeds}
          deleteUrl={this.deleteUrl}
          play={this.playAudio}
          refresh={this.refresh}
          addFeed={this.addFeed}
        />
        <div className = "playing-image">{image ? <img src={image} alt=""/> : null}</div>
        <Player playing={playing} setTime={time => this.setState({time})} />
        <PlayingInfo playing={playing} tags={this.getTags()}/>
        <TextEntry placeholder="Enter Tag:" className="tag-entry" callback={this.addTag} />
      </div>
    );
  }

  refresh() {
    Object.keys(this.state.feeds).forEach(this.addFeed);
  }

  getTags() {
    let tags = this.state.tags;
    let playing = this.state.playing;

    if (!playing) {
      return [];
    }

    let url = playing.feedUrl;
    let guid = playing.episode.guid;

    if (playing && url in tags && guid in tags[url]) {
      return tags[url][guid];
    } else {
      return [];
    }
  }

  addTag(tag) {
    if (!this.state.playing) {
      return;
    }

    let playing = this.state.playing;

    let newTags = merge(
      this.state.tags,
      {
        [playing.feedUrl]: {
          [playing.episode.guid]: [{'text': tag, 'time': this.state.time}]
        }
      }
    );

    this.setState({tags: newTags});
  }

  deleteUrl(url) {
    let {[url]: value, ...others} = this.state.feeds;
    this.setState({feeds: others}, this.saveFeeds);

  }

  playAudio(episode, feedUrl) {
    this.setState({playing: {'episode': episode, 'feed': this.state.feeds[feedUrl].data, 'feedUrl': feedUrl}});
  }

  clearFeeds() {
    this.setState({feeds: []}, this.saveFeeds);
  }

  addFeed(url) {
    this.setMessage(`Loading ${url}...`);

    requestPodcast(url, (error, data) => {
      if (error) {
        this.setError(error);
      } else if (data === {}) {
        this.setError("Empty feed!");
      } else {
        const newFeeds = {...this.state.feeds, [url]: {time: Date.now(), data}};
        this.setState({feeds: newFeeds}, this.saveFeeds);
        this.setMessage('');
      }
    });
  }

  setMessage(message) {
    this.setState({message});
  }

  setError(error) {
    console.error(error);
    this.setMessage("Error: " + error);
  }

  loadFeeds() {
    this.props.userSession.getFile(FEEDS_FILENAME, {})
      .then(content => {
        this.setState({feeds: JSON.parse(content) || {}});
      });
  }

  saveFeeds() {
    this.props.userSession.putFile(FEEDS_FILENAME, JSON.stringify(this.state.feeds), {});
  }

  componentDidMount() {
    const { userSession } = this.props;
    this.setState({
      person: new Person(userSession.loadUserData().profile),
    });

    this.loadFeeds();
    //this.saveFeeds();
  }
}
