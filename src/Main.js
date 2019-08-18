import React, { Component } from 'react';
import {
  Person,
} from 'blockstack';


import Browser from './Browser.js';
import TagEntry from './TagEntry.js';
import PlayingInfo from './PlayingInfo.js';

import {requestPodcast} from './utils.js';
import ReactAudioPlayer from 'react-audio-player';

import merge from 'deepmerge';

const FEEDS_FILENAME = 'feeds.json';

export default class Main extends Component {
  constructor(props) {
  	super(props);

  	this.state = {
      tempUrl: '',
      message: '',
      feeds: {},
      playing: null,
      tags: {},
      time: 0
  	};

    this.addFeed = this.addFeed.bind(this);
    this.clearFeeds = this.clearFeeds.bind(this);
    this.playAudio = this.playAudio.bind(this);
    this.deleteUrl = this.deleteUrl.bind(this);
    this.addTag = this.addTag.bind(this);
  }

  render() {
    const { userSession } = this.props;

    if (userSession.isSignInPending()) {
      return null;
    }

    const feeds = this.state.feeds;
    const playing = this.state.playing;

    return (
      <div className="dashboard">
        <div className = "titlebar"></div>
        <Browser feeds={feeds} deleteUrl={this.deleteUrl} play={this.playAudio}/>
        <div className = "playing-image">
          <img src={playing ? playing.episode.image ? playing.episode.image : playing.feed.image ? playing.feed.image : null : null} alt=""/>
        </div>
        <ReactAudioPlayer
          className="playing-audio"
          autoPlay controls src={playing ? playing.episode.enclosure.url : null}
          listenInterval={1000}
          onListen={time => this.setState({time})}
        />
        <PlayingInfo playing={playing} tags={this.getTags()}/>
        <TagEntry className="tag-entry" callback={this.addTag} />
      </div>
    );


    /*return (
      <div style={style}>
        <div style={s2}>
          {/*https://www.patreon.com/rss/cumtownRSS?auth=Sk3CTXwaTx0Aw_bT2PxSmYnN-st3sdxB}

          <ReactAudioPlayer autoPlay controls src={this.state.playing} />

          <div className="flexbox-left-center">
            <form  className="flexbox-left-center">
              <h2>Add Feed:</h2>
              <input type="text" value={this.state.tempUrl} onChange={(e) => this.setState({tempUrl: e.target.value})} className="unbordered coloured"/>
              <input type="submit" value="go!" className="coloured unbordered rounded padding-slight hover" />
            </form>
            <Button text="clear" onClick={this.clearFeeds}/>
          </div>

          {this.state.message ? <p>{this.state.message}</p> : null}

          {Object.keys(feeds).map(url => <Feed key={url} feed={feeds[url].data} time={feeds[url].time} playAudio={this.playAudio} />)}
        </div>  
        <div style={s3}>hey</div> 
        <div style={s4}>hey2</div>       
      </div>
    );*/
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

    console.log(newTags);

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

  addFeed(e) {
    e.preventDefault();

    const url = this.state.tempUrl;

    if (!url) {
      return;
    }

    this.setMessage(`Loading ${url}...`);

    requestPodcast(url, (error, data) => {
      if (error) {
        this.setError(error);
      } else if (data === {}) {
        console.log()
        this.setError("Empty feed!");
      } else {
        console.log(data);
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
