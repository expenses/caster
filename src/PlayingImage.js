import React, { Component } from 'react';

export default class PlayingImage extends Component {
  render() {
    let playing = this.props.playing;

    let image = null;

    if (playing) {
      if (playing.episode.imageURL) {
        image = playing.episode.imageURL;
      } else if (playing.feed.meta.imageURL) {
        image = playing.feed.meta.imageURL;
      }
    }

    return (
      <div className = "playing-image">
        {image ? <img src={image} alt=""/> : null}
      </div>
    );
  }
}
