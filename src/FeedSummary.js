import React, { Component } from 'react';

import moment from 'moment';
import { XCircle } from 'react-feather';

export default class FeedSummary extends Component {
	render() {
  	let feed = this.props.feed;

  	return (
  		<div className="browser-item" onClick={this.props.onClick}>
  			<img src={feed.meta.imageURL} alt=""/>
  			<div className="feed-description" >
  				<div>
	  				<h2>{feed.meta.title}</h2>
	  				<p>{feed.meta.description}</p>
	  				<p>{feed.episodes.length} episodes</p>
	  				<p>Last refreshed {moment(this.props.time).fromNow()}</p>
            <p>Latest episode was {moment(feed.episodes[0].pubDate).fromNow()}</p>
	  			</div>
	  			<XCircle className="x-button" onClick={this.delete.bind(this)}/>
  			</div>
  		</div>
  	);
  }

  delete(e) {
  	e.stopPropagation();
  	this.props.delete();
  }
}
