import React, { Component } from 'react';

export default class PlayingInfo extends Component {
  render() {
  	let playing = this.props.playing;
  	let tags = this.props.tags;

    return (
    	<div className = "playing-info">
	      <h1>{playing ? playing.episode.title : 'No Episode Selected'}</h1>
	      {playing ? <h2>{playing.feed.title}</h2> : null}
	      {playing ? <p dangerouslySetInnerHTML={{__html: playing.episode.description}}></p> : null}
	      {playing ? <h2>Tags:</h2> : null}
	      <p>{tags.map(tag => `${tag.text} @ ${tag.time}`).join(', ')}</p>
	    </div>
    );
  }
}
