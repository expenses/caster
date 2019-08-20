import React, { Component } from 'react';

export default class PlayingImage extends Component {
  render() {
    let playing = this.props.playing;
    let image = playing ? playing.episode.image ? playing.episode.image : playing.feed.image ? playing.feed.image : null : null;

    return (
      <div className = "playing-image">
        {image ? <img src={image} alt=""/> : null}
      </div>
    );
  }
}
