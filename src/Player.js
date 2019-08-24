/*import React, { Component } from 'react';
import ReactAudioPlayer from 'react-audio-player';

import { Rewind, FastForward, Pause, Play } from 'react-feather';
import oc from 'ts-optchain';

interface Properties {
  url: string;
  settings: Settings;
}

export default class Player extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // read only
      time: 0,
      playing: false
    };

    this.seek = this.seek.bind(this);
    this.seekBackwards = this.seekBackwards.bind(this);
    this.seekForwards = this.seekForwards.bind(this);
  }

  render() {
    let audioEl = oc(this.player).audioEl;

    return (
      <div className="player">
        <Rewind onClick={this.seekBackwards}/>
        {this.state.playing ?
          <Pause onClick={() => oc(audioEl).pause()} /> :
          <Play onClick={() => oc(audioEl).play()} />
        }
        <FastForward onClick={this.seekForwards}/>
        <p>{timestamp(this.state.time)}</p>
        <input
          className="player-bar"
          type="range"
          min="0"
          value={oc(audioEl).currentTime || 0}
          max={oc(audioEl).duration || 0}
          step="any"
          onChange={(e) => this.seek(e.target.value)}
        />
        <p>{oc(audioEl).duration ? timestamp(audioEl.duration) : '--:--:--'}</p>
        <ReactAudioPlayer
          autoPlay
          src={this.props.url}
          ref={ref => this.player = ref}
          onPlay={() => this.setState({playing: true})}
          onPause={() => this.setState({playing: false})}
          listenInterval={100}
          onListen={time => this.setState({time})}
        />
      </div>
    );
  }

  time() {
    return oc(this.player).audioEl.currentTime || 0;
  }

  seek(time) {
    let audioEl = this.player.audioEl;

    if (!audioEl.src) {
      return;
    }

    audioEl.currentTime = time;
    this.setState({time});
  }

  seekBackwards() {
    this.seek(this.player.audioEl.currentTime - this.props.settings.seekAmount)
  }

  seekForwards() {
    this.seek(this.player.audioEl.currentTime + this.props.settings.seekAmount)
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
*/
