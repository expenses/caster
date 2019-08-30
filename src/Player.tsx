import React, {Component, ReactElement} from 'react';
import ReactAudioPlayer from 'react-audio-player';
import {FastForward, Pause, Play, Rewind} from 'react-feather';
import {Feeds, Playing, Settings} from './types';
import {episodeImage, timestamp} from './utils';

import './Player.scss';

interface Props {
  playing: Playing | undefined;
  feeds: Feeds;
  duration: number | undefined;
  updatePlaying: (update: object) => void;
  setDuration: (duration: number) => void;
  endPlaying: () => void;
  settings: Settings;
}

function playerBar(time: number, duration: number | undefined) {
  let percentage = 0;

  if (duration) {
    const fraction = time / duration;
    percentage = fraction * 100;
  }

  return (
    <div className='player-bar-inner'>
      <div className='player-bar-progress' style={{width: `${percentage}%`}} />
    </div>
  );
}

export default class Player extends Component<Props> {
  render() {
    const {playing, feeds, updatePlaying, duration, endPlaying} = this.props;
    const {seekAmount} = this.props.settings;

    // Eww
    const paused = playing ? playing.paused : true;
    const epRef = playing ? playing.epRef : null;
    const episode = epRef ? epRef.episode : null;

    return (
      <div className='player'>
        <div className='player-bar'>
          {playerBar(this.time(), duration)}
        </div>
        <div className='player-image'>
          {epRef ? <img src={episodeImage(epRef, this.props.feeds)} alt='' /> : null}
        </div>
        <div className='player-description'>
          <div>
            <p><strong>{episode ? episode.title : null}</strong></p>
            <p>{epRef ? feeds[epRef.feedUrl].data.meta.title : null}</p>
          </div>
        </div>
        <div className='player-button'>
          {this.playerButton()}
        </div>
        <div className='desktop-player'>
          <Rewind onClick={() => this.seek(-seekAmount)} />
          {this.playerButton()}
          <FastForward onClick={() => this.seek(+seekAmount)} />
          <p>{timestamp(this.time())}</p>
          <input
            className='player-range-bar'
            type='range'
            min='0'
            value={this.time()}
            max={duration || 0}
            step='any'
            onChange={e => updatePlaying({time: e.target.value})}
          />
          <p>{timestamp(duration || 0)}</p>
        </div>
        <div className='desktop-player-description'>
          <h2>{episode ? episode.title : null}</h2>
          <h3>{epRef ? feeds[epRef.feedUrl].data.meta.title : null}</h3>
          <p
            dangerouslySetInnerHTML={{__html: episode ? episode.description : ''}}
          />
        </div>
        <ReactAudioPlayer
          time={this.time()}
          playing={!paused}
          src={episode ? episode.enclosure.url : undefined}
          listenInterval={100}
          onListen={(time: number) => this.props.updatePlaying({time})}
          onLoad={audio => this.props.setDuration(audio.duration)}
          onEnded={endPlaying}
        />
      </div>
    );
  }

  seek(relative: number) {
    const {playing, updatePlaying} = this.props;

    if (playing) {
      updatePlaying({time: playing.time + relative});
    }
  }

  time(): number {
    return this.props.playing ? this.props.playing.time : 0;
  }

  playerButton(): ReactElement | undefined {
    const {playing, updatePlaying} = this.props;

    if (playing) {
      if (playing.paused) {
        return <Play onClick={() => updatePlaying({paused: false})} />;
      }
      return <Pause onClick={() => updatePlaying({paused: true})} />;
    }

    return <Play />;
  }
}
