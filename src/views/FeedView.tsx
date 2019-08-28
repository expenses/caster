import React, {Component} from 'react';

import EpisodeItem from '../EpisodeItem';
import {EpisodeReference, Feeds} from '../types';

interface Props {
  feeds: Feeds;
  feedUrl: string;
  openEpisode: (ref: EpisodeReference) => void;
  playEpisode: (ref: EpisodeReference) => void;
}

export default class FeedView extends Component<Props> {
  render() {
    const {feeds, feedUrl, openEpisode, playEpisode} = this.props;

    return feeds[feedUrl].data.episodes.map(episode => <EpisodeItem
      key={episode.guid}
      episode={{episode, feedUrl}}
      feeds={feeds}
      openEpisode={openEpisode}
      playEpisode={playEpisode}
    />);
  }
}
