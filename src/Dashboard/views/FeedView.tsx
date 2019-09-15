import React from 'react';

import EpisodeItem from '../EpisodeItem';
import {EpisodeReference, Feeds} from '../types';

interface Props {
  feeds: Feeds;
  feedUrl: string;
  openEpisode: (ref: EpisodeReference) => void;
  playEpisode: (ref: EpisodeReference) => void;
}

export default React.memo((props: Props) => {
  const {feeds, feedUrl} = props;

  const episodes = feeds[feedUrl].data.episodes.map(episode => (
    <EpisodeItem
      key={episode.guid}
      episode={{episode, feedUrl}}
      {...props}
    />
  ));

  return <>{episodes}</>;
});
