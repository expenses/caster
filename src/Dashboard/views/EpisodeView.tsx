import React from 'react';
import {FastForward, Pause, Play, Rewind} from 'react-feather';
import {EpisodeReference, Feeds, Playing, Settings} from '../types';
import {episodeImage, timestamp} from '../utils';

import './EpisodeView.scss';

interface Props {
  epRef: EpisodeReference;
  feeds: Feeds;
  playEpisode: (ref: EpisodeReference) => void;
  playing: Playing | undefined;
  playingDuration: number | undefined;
  updatePlaying: (updates: object) => void;
  settings: Settings;
}

export default function EpisodeView(props: Props) {
  const {epRef, feeds} = props;

  return (
    <div className='episode-view'>
      <h1>{epRef.episode.title}</h1>
      <h2>{feeds[epRef.feedUrl].data.meta.title}</h2>
      <img src={episodeImage(epRef, feeds)} alt='' />
      <p dangerouslySetInnerHTML={{__html: epRef.episode.description}} />
      <Player {...props} />
    </div>
  );
}

function Player(props: Props) {
  const {epRef, updatePlaying, playingDuration, playing, settings} = props;
  const same = playing ? playing.epRef === epRef : false;
  const {seekAmount} = settings;

  if (playing !== undefined && same) {
    return (
      <div className='episode-player'>
        <p>{timestamp(playing.time)}</p>
        <Rewind onClick={() => updatePlaying({time: playing.time - seekAmount})} size='32px' />
        <PlayButton {...props} />
        <FastForward onClick={() => updatePlaying({time: playing.time + seekAmount})} size='32px' />
        <p>{timestamp(playingDuration || 0)}</p>
      </div>
    );
  }
  return (
    <div className='episode-player'>
      <Rewind size='32px' />
      <PlayButton {...props} />
      <FastForward size='32px' />
    </div>
  );
}

function PlayButton(props: Props) {
  const {playing, updatePlaying, playEpisode, epRef} = props;

  if (playing !== undefined && playing.epRef === epRef) {
    if (playing.paused) {
      return <Play onClick={() => updatePlaying({paused: false})} size='36px' />;
    }
    return <Pause onClick={() => updatePlaying({paused: true})} size='36px' />;
  }
  return <Play onClick={() => playEpisode(epRef)} size='36px' />;
}
