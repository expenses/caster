import React, { Component } from 'react';

import { hologo } from 'hologo';
import { XCircle } from 'react-feather';
 
export default class FeedSummary extends Component {
	render() {
  	let feed = this.props.feed;

  	return (
  		<div className="browser-item" onClick={this.props.onClick}>
  			<img src={feed.image} alt=""/>
  			<div className="item-description" >
  				<div>
	  				<h2>{feed.title}</h2>
	  				{feed.description ? <p>{feed.description.long}</p> : null}
	  				{feed.episodes ? <p>{`${feed.episodes.length} episodes`}</p> : null}
	  				<p>Last refreshed: {hologo(this.props.time)} ago</p>
	  			</div>

	  			<div className="x-button" onClick={this.delete.bind(this)}>
  					<XCircle/>
  				</div>
  			</div>
  		</div>
  	);
  }

  delete(e) {
  	e.stopPropagation();
  	this.props.delete();
  }
}
