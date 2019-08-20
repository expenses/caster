import React, { Component } from 'react';
import ReactAudioPlayer from 'react-audio-player';

import { Pause, Play } from 'react-feather';

export default class Player extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // read only
      time: 0,
      playing: false
    };
  }

  render() {
    let playing = this.props.playing;

    let player = (
      <ReactAudioPlayer
        autoPlay
        src={playing ? playing.episode.enclosure.url : null}
        ref={ref => this.player = ref}
        onPlay={() => this.setState({playing: true})}
        onPause={() => this.setState({playing: false})}
        listenInterval={100}
        onListen={time => this.setState({time})}
      />
    );

    if (!this.player) {
      return <div className="player">{player}</div>;
    }

    let audioEl = this.player.audioEl;
    let src = audioEl.src;

    let button = this.state.playing ?
      <Pause onClick={() => audioEl.pause()} /> :
      <Play onClick={() => src ? audioEl.play() : null} />;

    //console.log(audioEl);

    return (
      <div className="player">
        {button}
        <p>{timestamp(this.state.time)}</p>
        <div className="player-bar"></div>
        <p>{src ? timestamp(audioEl.duration) : '--:--:--'}</p>
        {player}
      </div>
    );
  }

  time() {
    return this.player ? this.player.audioEl.currentTime : 0;
  }

  seek(time) {
    this.player.audioEl.currentTime = time;
    this.setState({time});
  }

  toggle() {
    let audioEl = this.player.audioEl;

    if (!audioEl.src) {
      return;
    }

    if (this.state.playing) {
      audioEl.pause();
    } else {
      audioEl.play();
    }
  }
}

function timestamp(secs) {
  var hours   = Math.floor(secs / 3600);
  var minutes = Math.floor((secs - (hours * 3600)) / 60);
  var seconds = Math.floor(secs % 60);

  if (hours   < 10) {hours   = "0"+hours;}
  if (minutes < 10) {minutes = "0"+minutes;}
  if (seconds < 10) {seconds = "0"+seconds;}

  return `${hours}:${minutes}:${seconds}`;
}
