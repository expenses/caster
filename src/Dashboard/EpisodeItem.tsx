import moment from 'moment';
import React from 'react';
import {MoreHorizontal, Play} from 'react-feather';
import Item from './Item';
import {EpisodeReference, Feeds} from './types';
import {episodeImage} from './utils';

interface Props {
  episode: EpisodeReference;
  feeds: Feeds;
  openEpisode: (ref: EpisodeReference) => void;
  playEpisode: (ref: EpisodeReference) => void;
}

export default function EpisodeItem(props: Props) {
  const {episode, feeds, openEpisode, playEpisode} = props;

  return (
    <Item
      title={episode.episode.title}
      image={episodeImage(episode, feeds)}
      body={(
        <p>{moment(episode.episode.pubDate).format('L LT')}</p>
      )}
      icons={(
        <>
          <Play onClick={() => playEpisode(episode)} />
          <MoreHorizontal onClick={() => openEpisode(episode)} />
        </>
      )}
      className='episode'
    />
  );
}
