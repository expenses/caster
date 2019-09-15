import React from 'react';
import {Feeds, Settings, EpisodeReference} from '../types';
import {episodeImage, timestamp} from '../utils';
import DesktopPlayer from './DesktopPlayer';
import PlayerButton from './PlayerButton';
import PlayerBar from './PlayerBar';
import AudioPlayer from '../AudioPlayer';
import './index.scss';

interface Props {
  feeds: Feeds;
  settings: Settings;
  openEpisode: (ref: EpisodeReference) => void;
  audioPlayer: AudioPlayer;
}

export default function Player(props: Props) {
  const {feeds, openEpisode, settings, audioPlayer} = props;

  const epRef = audioPlayer.getEpRef();

  const episode = epRef ? epRef.episode : null;

  const episodeTitle = episode ? episode.title : null;
  const feedTitle = epRef ? feeds[epRef.feedUrl].data.meta.title : null;

  const loadEp = () => (epRef ? openEpisode(epRef) : null);

  return (
    <div className='player'>
      <PlayerBar audioPlayer={audioPlayer} />
      <div className='player-image' onClick={loadEp}>
        {epRef ? <img src={episodeImage(epRef, feeds)} alt='' /> : null}
      </div>
      <div className='player-description' onClick={loadEp}>
        <p className='player-description-title'>{episodeTitle}</p>
        <p className='player-description-subtitle'>{feedTitle}</p>
        <p className='player-description-time'>
          {epRef ? `${timestamp(audioPlayer.time())}/${timestamp(audioPlayer.duration())}` : null}
        </p>
      </div>
      <div className='player-button'>
        <PlayerButton audioPlayer={audioPlayer} />
      </div>
      <DesktopPlayer
        {...props}
        audioPlayer={audioPlayer}
        seekAmount={settings.seekAmount}
      />
      <div className='desktop-player-description'>
        <h2>{episodeTitle}</h2>
        <h3>{feedTitle}</h3>
        <p
          dangerouslySetInnerHTML={{__html: episode ? episode.description : ''}}
        />
      </div>
    </div>
  );
}
