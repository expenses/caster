import React, {Component, MouseEvent, ReactElement} from 'react';
import {Play, Pause} from 'react-feather';
import AudioPlayer from '../AudioPlayer';

interface Props {
  audioPlayer: AudioPlayer;
  fallback?: ReactElement;
}

export default class PlayerButton extends Component<Props> {
  render() {
    const {audioPlayer, fallback} = this.props;
    const toggle = this.toggle.bind(this);

    if (audioPlayer.isLoaded()) {
      if (audioPlayer.isPaused()) {
        return <Play onClick={toggle} />;
      }
      return <Pause onClick={toggle} />;
    }

    return fallback || null;
  }

  toggle(e: MouseEvent) {
    const {audioPlayer} = this.props;
    e.stopPropagation();
    audioPlayer.toggle();
  }
}
