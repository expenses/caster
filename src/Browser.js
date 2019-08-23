import React, { Component } from 'react';

import FeedSummary from './FeedSummary.js';
import Episode from './Episode.js';
import BrowserInput from './BrowserInput.js';

import fuzzysort from 'fuzzysort';
import {LogOut, Home, Settings, Search, RefreshCw} from 'react-feather';

export default class Browser extends Component {
  constructor(props) {
  	super(props);

  	this.state = {
  		selected: null,
      search: false,
      searchTerm: ''
  	};

    this.toHome = this.toHome.bind(this);
  }

  render() {
  	return (
  		<div className="browser">
        <div className="titlebar">
          <div className="titlebar-left">
            <LogOut onClick={this.props.logout} />
            <Settings onClick={this.props.settings} style={this.style(this.props.settingsOpen)} />
            <Home
              onClick={this.toHome}
              style={this.style(!this.state.selected && !this.state.search && !this.props.settingsOpen)}
            />
            <Search
              onClick={() => this.setState({search: true})}
              style={this.style(this.state.search && !this.props.settingsOpen)}
            />
            <h1>{this.title()}</h1>
          </div>
          <RefreshCw onClick={this.props.refresh} />
        </div>
  			<div className="browser-content">{this.inner()}</div>
        <BrowserInput
          searchTerm={this.state.searchTerm}
          onChange={searchTerm => this.setState({searchTerm})}
          search={this.state.search}
          addFeed={this.props.addFeed}
          returnFocus={this.props.returnFocus}
        />
  		</div>
  	);
  }

  title() {
    if (this.state.search) {
      return 'Search episodes';
    } else if (this.state.selected) {
      return this.props.feeds[this.state.selected].data.meta.title;
    } else {
      return 'Podcasts';
    }
  }

  inner() {
    let feeds = this.props.feeds;
    let selected = this.state.selected;

    if (this.state.search && !this.state.searchTerm) {
      return <h1 className="center">No search term entered</h1>;
    } else if (this.state.search) {
      let objects = Object.keys(feeds)
        .flatMap(url => feeds[url].data.episodes.map(episode => {
          return {
            episode, url,
            episode_title: episode.title,
            episode_description: episode.description
          }
        }));

      let options = {
        limit: 50,
        keys: ['episode_title', 'episode_description'],
        threshold: -500
      };

      return fuzzysort.go(this.state.searchTerm, objects, options)
        .map(result => this.episode(result.obj.episode, result.obj.url));
    }

  	if (selected) {
  		let feed = feeds[selected].data;

  		return feed.episodes.map(episode => this.episode(episode, selected));
  	} else {
  		return Object.keys(feeds).map(url => {
				return <FeedSummary
					key={url}
					feed={feeds[url].data}
					time={feeds[url].time}
					delete={() => this.props.deleteUrl(url)}
					onClick={() => this.setState({selected: url})}
				/>;
			});
  	}
  }

  episode(episode, url) {
    return <Episode
      episode={episode}
      key={episode.guid}
      backupImage={this.props.feeds[url].data.meta.imageURL}
      play={() => this.props.play(episode, url)}
    />;
  }

  style(predicate) {
    return predicate ? {color: 'white'} : null;
  }

  toHome() {
    this.setState({selected: null, search: false});
  }
}
