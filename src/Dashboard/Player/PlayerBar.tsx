import React from 'react';
import AudioPlayer from '../AudioPlayer';

interface Props {
  audioPlayer: AudioPlayer;
}

export default function PlayerBar(props: Props) {
  const {audioPlayer} = props;

  return (
    <div className='player-bar' style={{display: audioPlayer.isLoaded() ? 'inherit' : 'none'}}>
      <div className='player-bar-inner'>
        <div className='player-bar-progress' style={{width: `${audioPlayer.fraction() * 100}%`}} />
      </div>
    </div>
  );
}
