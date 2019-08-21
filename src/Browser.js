import React, { Component } from 'react';

import FeedSummary from './FeedSummary.js';
import Episode from './Episode.js';
import TextEntry from './TextEntry.js';

import { Home, Settings, Search, RefreshCw } from 'react-feather';

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
            <Settings onClick={this.props.settings} />
            <Home onClick={this.toHome} style={this.style(!this.state.selected && !this.state.search)} />
            <Search onClick={() => this.setState({search: true})} style={this.style(this.state.search)} />
            <h1>{this.state.selected ? this.props.feeds[this.state.selected].data.meta.title : 'Podcasts'}</h1>
          </div>
          <RefreshCw onClick={this.props.refresh} />
        </div>
  			<div className="browser-content">{this.inner()}</div>
        {this.input()}
  		</div>
  	);
  }

  inner() {
    let feeds = this.props.feeds;
    let selected = this.state.selected;

    if (this.state.search) {
      return Object.keys(feeds)
        .flatMap(url => feeds[url].data.episodes.map(episode => {return {episode, url}}))
        .filter(tuple => this.filterEpisode(tuple.episode))
        .map(tuple => this.episode(tuple.episode, tuple.url))
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

  filterEpisode(episode) {
    let term = this.state.searchTerm.toLowerCase();

    return episode.title.toLowerCase().includes(term) || episode.description.toLowerCase().includes(term);
  }

  episode(episode, url) {
    return <Episode
      episode={episode}
      key={episode.title}
      backupImage={this.props.feeds[url].data.meta.imageURL}
      play={() => this.props.play(episode, url)}
    />;
  }

  input() {
    if (this.state.search) {
      return <input
        className="browser-input"
        placeholder="Search:"
        onChange={(e) => this.setState({searchTerm: e.target.value})}
        onKeyDown={e => e.stopPropagation()}
        value={this.state.searchTerm}
      />;
    } else {
      return <TextEntry
        className="browser-input"
        placeholder="Enter Url:"
        callback={this.props.addFeed}
        returnFocus={this.props.returnFocus}
      />;
    }
  }

  setSearch(e) {
    e.stopPropagation();
    this.setState({searchTerm: e.target.value});
  }

  style(predicate) {
    return predicate ? {color: 'white'} : null;
  }

  toHome() {
    this.setState({selected: null, search: false});
  }
}
