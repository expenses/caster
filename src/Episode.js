import React, { Component } from 'react';

export default class Episode extends Component {
  render() {
    let episode = this.props.episode;

    return (
      <div className="browser-item" onClick={this.props.play}>
        <img src={episode.image ? episode.image : this.props.backupImage} alt=""/>
        <div className="item-description">
          <h2>{episode.title}</h2>
        </div>
      </div>
    );
  }
}
