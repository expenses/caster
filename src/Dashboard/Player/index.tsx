import React, {Component} from 'react';
import ReactAudioPlayer from 'react-audio-player';
import {Feeds, Playing, Settings, EpisodeReference} from '../types';
import {episodeImage} from '../utils';
import DesktopPlayer from './DesktopPlayer';
import PlayerButton from './PlayerButton';
import PlayerBar from './PlayerBar';
import './Player.scss';

interface Props {
  playing: Playing | undefined;
  feeds: Feeds;
  duration: number | undefined;
  updatePlaying: (updates: Partial<Playing>) => void;
  setDuration: (duration: number) => void;
  endPlaying: () => void;
  settings: Settings;
  openEpisode: (ref: EpisodeReference) => void;
}

export default class Player extends Component<Props> {
  render() {
    const {playing, feeds, updatePlaying, duration, endPlaying, openEpisode, setDuration, settings} = this.props;

    // Eww
    const paused = playing ? playing.paused : true;
    const epRef = playing ? playing.epRef : null;
    const episode = epRef ? epRef.episode : null;

    const time = playing ? playing.time : 0;
    const episodeTitle = episode ? episode.title : null;
    const feedTitle = epRef ? feeds[epRef.feedUrl].data.meta.title : null;

    return (
      <div className='player' onClick={() => (epRef ? openEpisode(epRef) : null)}>
        <PlayerBar time={time} duration={duration} />
        <div className='player-image'>
          {epRef ? <img src={episodeImage(epRef, this.props.feeds)} alt='' /> : null}
        </div>
        <div className='player-description'>
          <div>
            <p className='player-description-title'>{episodeTitle}</p>
            <p>{feedTitle}</p>
          </div>
        </div>
        <div className='player-button'>
          <PlayerButton playing={playing} updatePlaying={updatePlaying} />
        </div>
        <DesktopPlayer
          playing={playing}
          duration={duration}
          seek={this.seek}
          updatePlaying={updatePlaying}
          seekAmount={settings.seekAmount}
        />
        <div className='desktop-player-description'>
          <h2>{episodeTitle}</h2>
          <h3>{feedTitle}</h3>
          <p
            dangerouslySetInnerHTML={{__html: episode ? episode.description : ''}}
          />
        </div>
        <ReactAudioPlayer
          time={time}
          playing={!paused}
          src={episode ? episode.enclosure.url : undefined}
          listenInterval={100}
          onListen={(time: number) => updatePlaying({time})}
          onLoad={audio => setDuration(audio.duration)}
          onEnded={endPlaying}
          title={episodeTitle || undefined}
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
}
