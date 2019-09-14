import React from 'react';
import {Rewind, FastForward, Play} from 'react-feather';
import {timestamp} from '../utils';
import PlayerButton from './PlayerButton';
import AudioPlayer from '../AudioPlayer';

interface Props {
  seekAmount: number;
  audioPlayer: AudioPlayer;
}

export default function DesktopPlayer(props: Props) {
  const {seekAmount, audioPlayer} = props;

  return (
    <div className='desktop-player'>
      <Rewind onClick={() => audioPlayer.seekRelative(-seekAmount)} />
      <PlayerButton audioPlayer={audioPlayer} fallback={<Play />} />
      <FastForward onClick={() => audioPlayer.seekRelative(+seekAmount)} />
      <p>{timestamp(audioPlayer.time())}</p>
      <input
        className='player-range-bar'
        type='range'
        min='0'
        value={audioPlayer.time()}
        max={audioPlayer.duration()}
        step='any'
        onChange={e => audioPlayer.seekTo(e.target.value as any as number)}
      />
      <p>{timestamp(audioPlayer.duration())}</p>
    </div>
  );
}
