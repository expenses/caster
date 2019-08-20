import React, { Component } from 'react';

import FeedSummary from './FeedSummary.js';
import Episode from './Episode.js';
import TextEntry from './TextEntry.js';

import { Settings, RefreshCw, ChevronLeft } from 'react-feather';

export default class Browser extends Component {
  constructor(props) {
  	super(props);

  	this.state = {
  		selected: null
  	};
  }

  render() {
  	let feeds = this.props.feeds;

  	let titlebar = (
  		<div className="titlebar">
        <Settings onClick={this.props.settings} />
        <RefreshCw onClick={this.props.refresh} />
        {
        	this.state.selected ?
        	<ChevronLeft onClick={() => this.setState({selected: null})} />
        	:
        	<TextEntry
            className="feed-entry"
            placeholder="Enter Url:"
            callback={this.props.addFeed}
            returnFocus={this.props.returnFocus}
          />
        }
      </div>
  	);

  	let inner = null;

  	if (this.state.selected) {
  		let feed = feeds[this.state.selected].data;

  		inner = feed.episodes.map(episode => {
				return <Episode episode={episode} key={episode.guid} backupImage={feed.image} play={() => this.play(episode)}/>
			});
  	} else {
  		inner = Object.keys(feeds).map(url => {
				return <FeedSummary
					key={url}
					feed={feeds[url].data}
					time={feeds[url].time}
					delete={() => this.props.deleteUrl(url)}
					onClick={() => this.setState({selected: url})}
				/>;
			});
  	}

  	return (
  		<div className="browser">
  			{titlebar}
  			<div className="browser-content">{inner}</div>
  		</div>
  	);
  }

  play(episode) {
  	this.props.play(episode, this.state.selected);
  }
}
