import React from 'react';
import {Rewind, FastForward, Play} from 'react-feather';
import {Playing} from '../types';
import {timestamp} from '../utils';
import PlayerButton from './PlayerButton';

interface Props {
  playing: Playing | undefined;
  duration: number | undefined;
  seek: (amount: number) => void;
  updatePlaying: (updates: Partial<Playing>) => void;
  seekAmount: number;
}

export default function DesktopPlayer(props: Props) {
  const {playing, duration, seek, updatePlaying, seekAmount} = props;
  const time = playing ? playing.time : 0;

  return (
    <div className='desktop-player'>
      <Rewind onClick={() => seek(-seekAmount)} />
      <PlayerButton playing={playing} updatePlaying={updatePlaying} fallback={<Play />} />
      <FastForward onClick={() => seek(+seekAmount)} />
      <p>{timestamp(time)}</p>
      <input
        className='player-range-bar'
        type='range'
        min='0'
        value={time}
        max={duration || 0}
        step='any'
        onChange={e => updatePlaying({time: e.target.value as any as number})}
      />
      <p>{timestamp(duration || 0)}</p>
    </div>
  );
}
