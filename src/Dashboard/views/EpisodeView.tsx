import React from 'react';
import {FastForward, Pause, Play, Rewind} from 'react-feather';
import {EpisodeReference, Feeds, Settings} from '../types';
import AudioPlayer from '../AudioPlayer';
import {episodeImage, timestamp} from '../utils';

import './EpisodeView.scss';

interface Props {
  epRef: EpisodeReference;
  feeds: Feeds;
  playEpisode: (ref: EpisodeReference) => void;
  audioPlayer: AudioPlayer;
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
  const {epRef, audioPlayer, settings} = props;
  const same = audioPlayer.getEpRef() === epRef;
  const {seekAmount} = settings;

  if (same) {
    return (
      <div className='episode-player'>
        <p>{timestamp(audioPlayer.time())}</p>
        <Rewind onClick={() => audioPlayer.seekRelative(-seekAmount)} size='32px' />
        <PlayButton {...props} />
        <FastForward onClick={() => audioPlayer.seekRelative(+seekAmount)} size='32px' />
        <p>{timestamp(audioPlayer.duration())}</p>
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
  const {audioPlayer, playEpisode, epRef} = props;

  if (audioPlayer.getEpRef() === epRef) {
    if (audioPlayer.isPaused()) {
      return <Play onClick={() => audioPlayer.toggle()} size='36px' />;
    }
    return <Pause onClick={() => audioPlayer.toggle()} size='36px' />;
  }
  return <Play onClick={() => playEpisode(epRef)} size='36px' />;
}
