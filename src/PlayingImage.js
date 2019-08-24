import React, { Component } from 'react';

import oc from 'ts-optchain';

export default class PlayingImage extends Component {
  render() {
    let playing = this.props.playing;

    let image = oc(playing).episode.imageURL || oc(playing).feed.meta.imageURL;

    return (
      <div className = "playing-image">
        {image ? <img src={image} alt=""/> : null}
      </div>
    );
  }
}
