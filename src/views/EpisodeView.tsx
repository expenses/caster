import React, {Component, ReactElement} from 'react';
import {FastForward, Pause, Play, Rewind} from 'react-feather';
import {EpisodeReference, Feeds, Playing} from '../types';
import {episodeImage, timestamp} from '../utils';

import './EpisodeView.scss';

interface Props {
  epRef: EpisodeReference;
  feeds: Feeds;
  playEpisode: (ref: EpisodeReference) => void;
  playing: Playing | undefined;
  playingDuration: number | undefined;
  updatePlaying: (updates: object) => void;
}

export default class EpisodeView extends Component<Props> {
  render() {
    const {epRef, feeds} = this.props;

    return <div className='episode-view'>
      <h1>{epRef.episode.title}</h1>
      <h2>{feeds[epRef.feedUrl].data.meta.title}</h2>
      <img src={episodeImage(epRef, feeds)} alt=''/>
      <p dangerouslySetInnerHTML={{__html: epRef.episode.description}}></p>
      {this.player()}
    </div>;
  }

  player(): ReactElement {
    const {epRef, updatePlaying, playingDuration} = this.props;
    const same = this.props.playing ? this.props.playing.epRef === epRef : false;

    if (this.props.playing !== undefined && same) {
      const playing: Playing = this.props.playing;

      return <div className='episode-player'>
        <p>{timestamp(playing.time)}</p>
        <Rewind onClick={() => updatePlaying({time: playing.time - 5})} size='32px'/>
        {this.button()}
        <FastForward onClick={() => updatePlaying({time: playing.time + 5})} size='32px'/>
        <p>{timestamp(playingDuration || 0)}</p>
      </div>;
    } else {
      return <div className='episode-player'>
        <Rewind size='32px'/>
        {this.button()}
        <FastForward size='32px'/>
      </div>;
    }
  }

  button(): ReactElement {
    const {playing, updatePlaying, playEpisode, epRef} = this.props;

    if (playing !== undefined && playing.epRef === epRef) {
      if (playing.paused) {
        return <Play onClick={() => updatePlaying({paused: false})} size='36px' />;
      } else {
        return <Pause onClick={() => updatePlaying({paused: true})} size='36px'/>;
      }
    } else {
      return <Play onClick={(e => playEpisode(epRef))} size='36px'/>;
    }
  }
}
