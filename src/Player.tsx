import React, { Component } from 'react';
import {Pause, Play, Rewind, FastForward} from 'react-feather';
import {Playing, Feeds} from './types';
import {episodeImage, timestamp} from './utils';
import ReactAudioPlayer from 'react-audio-player';

import './Player.scss';

interface Props {
  playing: Playing | undefined;
  feeds: Feeds;
  duration: number | undefined;
  updatePlaying: (update: any) => void;
  setDuration: (duration: number) => void;
}

function playerBar(time: number, duration: number | undefined) {
  let percentage = 0;

  if (duration) {
    percentage = time / duration * 100
  }

  return <div className="player-bar-inner">
    <div className="player-bar-progress" style={{width: `${percentage}%`}}></div>
  </div>;
}

export default class Player extends Component<Props> {
  render() {
    let {playing, feeds, updatePlaying, duration} = this.props;

    // Eww
    let paused = playing ? playing.paused : true;
    let epRef = playing ? playing.epRef : null;
    let episode = epRef ? epRef.episode : null;

    return <div className="player">
      <div className="player-bar">
        {playerBar(this.time(), duration)}
      </div>
      <div className="player-image">
        {epRef ? <img src={episodeImage(epRef, this.props.feeds)} alt=""/> : null}
      </div>
      <div className="player-description">
        <div>
          <p><strong>{episode ? episode.title : null}</strong></p>
          <p>{epRef ? feeds[epRef.feedUrl].data.meta.title : null}</p>
        </div>
      </div>
      <div className="player-button">
        {this.playerButton()}
      </div>
      <div className="desktop-player">
        <Rewind/>
        {this.playerButton() || <Play/>}
        <FastForward/>
        <p>{timestamp(this.time())}</p>
        <input
          className="player-range-bar"
          type="range"
          min="0"
          value={this.time()}
          max={duration || 0}
          step="any"
          onChange={(e) => updatePlaying({time: e.target.value})}
        />
        <p>{timestamp(duration || 0)}</p>
      </div>
      <div className="desktop-player-description">
        <h2>{episode ? episode.title : null}</h2>
        <h3>{epRef ? feeds[epRef.feedUrl].data.meta.title : null}</h3>
        <p
          dangerouslySetInnerHTML={{__html: episode ? episode.description : ''}}
        ></p>
      </div>
      <ReactAudioPlayer
        time={playing ? playing.time : 0}
        playing={!paused}
        src={episode ? episode.enclosure.url : null}
        listenInterval={100}
        onListen={(time: number) => this.props.updatePlaying({time})}
        onLoad={this.props.setDuration}
      />
    </div>;
  }

  time(): number {
    return this.props.playing ? this.props.playing.time : 0;
  }

  playerButton(): any {
    let {playing, updatePlaying} = this.props;

    if (playing) {
      if (playing.paused) {
        return <Play onClick={() => playing ? updatePlaying({paused: false}) : null}/>;
      } else {
        return <Pause onClick={() => playing ? updatePlaying({paused: true}) : null}/>
      }
    }
  }

  /*render() {
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
  }*/
}
