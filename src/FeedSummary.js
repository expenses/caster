import React, { Component } from 'react';

import { hologo } from 'hologo';
 
export default class FeedSummary extends Component {
	render() {
  	let feed = this.props.feed;

  	return (
  		<div className="browser-item" onClick={this.props.onClick}>
  			<img src={feed.image} alt=""/>
  			<div className="item-description">
  				<h2>{feed.title}</h2>
  				{feed.description ? <p>{feed.description.long}</p> : null}
  				{feed.episodes ? <p>{`${feed.episodes.length} episodes`}</p> : null}
  				<p>Last refreshed: {hologo(this.props.time)} ago</p>

  				<button onClick={this.props.delete}>Delete</button>
  			</div>
  		</div>
  	);
  }
}
