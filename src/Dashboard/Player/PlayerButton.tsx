import React, {Component, MouseEvent, ReactElement} from 'react';
import {Play, Pause} from 'react-feather';
import {Playing} from '../types';

interface Props {
  playing: Playing | undefined;
  updatePlaying: (updates: Partial<Playing>) => void;
  fallback?: ReactElement;
}

export default class PlayerButton extends Component<Props> {
  render() {
    const {playing, fallback} = this.props;

    if (playing) {
      if (playing.paused) {
        return <Play onClick={e => this.setPaused(e, false)} />;
      }
      return <Pause onClick={e => this.setPaused(e, true)} />;
    }

    return fallback || null;
  }

  setPaused(e: MouseEvent, paused: boolean) {
    const {updatePlaying} = this.props;
    e.stopPropagation();
    updatePlaying({paused});
  }
}
