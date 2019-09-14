import React from 'react';

interface Props {
  className?: string;
  src: string;
}

export default function Picture(props: Props) {
  return (
    <picture className={props.className}>
      <source srcSet={`${props.src}.webp`} type='image/webp' />
      <source srcSet={`${props.src}.png`} type='image/png' />
      <img src={`${props.src}.png`} alt='' />
    </picture>
  );
}
