import React, { Component } from 'react';

import FeedSummary from './FeedSummary.js';
import Episode from './Episode.js';

export default class Browser extends Component {
  constructor(props) {
  	super(props);

  	this.state = {
  		selected: null
  	};
  }

  render() {
  	let feeds = this.props.feeds;

  	if (this.state.selected) {
  		let feed = feeds[this.state.selected].data;

  		return <div className="browser">
  			<button onClick={() => this.setState({selected: null})}>Back</button>

  			{
  				feed.episodes.map(episode => {
  					return <Episode episode={episode} key={episode.guid} backupImage={feed.image} play={() => this.props.play(episode, this.state.selected)}/>
  				})
  			}
  		</div>;
  	} else {
  		return (
	    	<div className="browser">
	    		{
	    			Object.keys(feeds).map(url => {
	    				return <FeedSummary
	    					key={url}
	    					feed={feeds[url].data}
	    					time={feeds[url].time}
	    					delete={() => this.props.deleteUrl(url)}
	    					onClick={() => this.setState({selected: url})}
	    				/>;
	    			})
	    		}
	    	</div>
	    );
  	}
  }
}
