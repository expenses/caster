import {EpisodeReference, Feeds, Playing} from './types';
import {episodeImage} from './utils';

export default class AudioPlayer {
  audio: HTMLAudioElement;

  epRef: EpisodeReference | null;

  timer: number | null;

  syncTimer: number | null;

  refresh: () => void;

  syncCallback: (playing: Playing) => void;

  constructor(refresh: () => void, syncCallback: (playing: Playing) => void) {
    this.audio = document.createElement('audio');
    this.epRef = null;
    this.timer = null;
    this.syncTimer = null;
    this.refresh = refresh;
    this.syncCallback = syncCallback;

    if (navigator.mediaSession) {
      navigator.mediaSession.setActionHandler('play',  this.play.bind(this));
      navigator.mediaSession.setActionHandler('pause', this.pause.bind(this));
      // todo: allow seek times to change
      navigator.mediaSession.setActionHandler('seekbackward', () => this.seekRelative(-5));
      navigator.mediaSession.setActionHandler('seekforward',  () => this.seekRelative(+5));
    }
  }

  getEpRef(): EpisodeReference | null {
    return this.epRef;
  }

  loadEp(epRef: EpisodeReference, feeds: Feeds, playing: boolean, time: number) {
    this.audio.src = epRef.episode.enclosure.url;
    this.epRef = epRef;
    this.audio.currentTime = time;

    if (playing) {
      this.playNoCallback();
    } else {
      this.pauseNoCallback();
    }

    if (navigator.mediaSession) {
      const {meta} = feeds[epRef.feedUrl].data;

      navigator.mediaSession.metadata = new MediaMetadata({
        title: epRef.episode.title,
        artist: meta.title,
        artwork: [{src: episodeImage(epRef, feeds)}]
      });
    }


    this.refresh();
  }

  isLoaded(): boolean {
    return this.getEpRef() !== null;
  }

  isPaused(): boolean {
    return this.audio.paused;
  }

  isPlaying(): boolean {
    return !this.audio.paused;
  }

  toggle() {
    if (this.audio.paused) {
      this.play();
    } else {
      this.pause();
    }
  }

  sync() {
    if (this.epRef !== null) this.syncCallback({epRef: this.epRef, time: this.time()});
  }

  playNoCallback() {
    this.audio.play();

    if (navigator.mediaSession) navigator.mediaSession.playbackState = 'playing';

    this.timer = window.setInterval(this.refresh, 100);
    this.syncTimer = window.setInterval(this.sync, 30 * 1000);
  }

  pauseNoCallback() {
    this.audio.pause();

    if (navigator.mediaSession) navigator.mediaSession.playbackState = 'paused';

    if (this.timer !== null) {
      window.clearInterval(this.timer);
      this.timer = null;
    }

    if (this.syncTimer !== null) {
      window.clearInterval(this.syncTimer);
      this.syncTimer = null;
    }
  }

  play() {
    this.playNoCallback();
    this.refresh();
  }

  pause() {
    this.pauseNoCallback();
    this.refresh();
    this.sync();
  }

  time(): number {
    return this.audio.currentTime;
  }

  fraction(): number {
    return this.time() / this.duration();
  }

  duration(): number {
    return this.audio.duration || 0;
  }

  seekTo(time: number) {
    this.audio.currentTime = time;
    this.refresh();
  }

  seekRelative(value: number) {
    this.seekTo(this.audio.currentTime + value);
  }
}
