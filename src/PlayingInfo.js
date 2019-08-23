import React, { Component } from 'react';
import {XCircle} from 'react-feather';

export default class PlayingInfo extends Component {
  render() {
  	let playing = this.props.playing;
  	let tags = this.props.tags;

    return (
      <div className="playing-info">
	      <h1>{playing?.episode.title || 'No Episode Selected'}</h1>
	      <h2>{playing?.feed.meta.title}</h2>
        <p dangerouslySetInnerHTML={{__html: playing?.episode.description}}></p>
	      {playing ? <h2>Tags:</h2> : null}
        <div className="tags">
          {
            tags.map((tag, i) =>
              <div
                key={i}
                className="tag"
                onClick={() => this.props.seek(tag.time)}
              >
                <p>{tag.text}</p>
                <XCircle
                  size="12px"
                  onClick={() => this.props.deleteTag(i)}
                />
              </div>
            )
          }
        </div>
	    </div>
    );
  }
}
