import React, { Component } from 'react';

export default class PlayingImage extends Component {
  render() {
    let playing = this.props.playing;

    let image = playing?.episode.imageURL || playing?.feed.meta.imageURL;

    return (
      <div className = "playing-image">
        {image ? <img src={image} alt=""/> : null}
      </div>
    );
  }
}
