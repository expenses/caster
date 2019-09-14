import React from 'react';

interface Props {
  time: number;
  duration: number | undefined;
}

export default function PlayerBar(props: Props) {
  const {time, duration} = props;

  let percentage = 0;

  if (duration) {
    const fraction = time / duration;
    percentage = fraction * 100;
  }

  return (
    <div className='player-bar' style={{display: duration ? 'inherit' : 'none'}}>
      <div className='player-bar-inner'>
        <div className='player-bar-progress' style={{width: `${percentage}%`}} />
      </div>
    </div>
  );
}
