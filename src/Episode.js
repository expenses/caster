import React, { Component } from 'react';
import moment from 'moment';

export default class Episode extends Component {
  render() {
    let episode = this.props.episode;

    return (
      <div className="browser-item" onClick={this.props.play}>
        <img src={episode.imageURL ? episode.imageURL : this.props.backupImage} alt=""/>
        <div className="episode-description">
          <h2>{episode.title}</h2>
          <p>{moment(episode.pubDate).format("L LT")}</p>
        </div>
      </div>
    );
  }
}
