import React, {Component} from 'react';
import moment from 'moment';
import Item from './Item';
import {EpisodeReference, Feeds} from './types';
import {episodeImage} from './utils';
import {Play, MoreHorizontal} from 'react-feather';

interface Props {
  episode: EpisodeReference;
  feeds: Feeds;
  openEpisode: (ref: EpisodeReference) => void;
  playEpisode: (ref: EpisodeReference) => void;
}

export default class EpisodeItem extends Component<Props> {
  render() {
    let {episode, feeds, openEpisode, playEpisode} = this.props;

    return <Item
      title={episode.episode.title}
      image={episodeImage(episode, feeds)}
      body={moment(episode.episode.pubDate).format('L LT')}
      icons={<>
        <Play onClick={() => playEpisode(episode)}/>
        <MoreHorizontal onClick={() => openEpisode(episode)}/>
      </>}
      className="episode"
    />;
  }
}
