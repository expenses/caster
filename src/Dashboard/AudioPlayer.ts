import {EpisodeReference, Playing} from './types';

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
  }

  getEpRef(): EpisodeReference | null {
    return this.epRef;
  }

  loadEp(epRef: EpisodeReference, playing: boolean, time: number) {
    this.audio.src = epRef.episode.enclosure.url;
    this.epRef = epRef;
    this.audio.currentTime = time;

    if (playing) {
      this.audio.play();
      this.setTimers();
    } else {
      this.audio.pause();
      this.clearTimers();
    }

    this.refresh();
  }

  setTimers() {
    this.timer = window.setInterval(this.refresh, 100);
    this.syncTimer = window.setInterval(this.sync, 30 * 1000);
  }

  clearTimers() {
    if (this.timer !== null) {
      window.clearInterval(this.timer);
      this.timer = null;
    }

    if (this.syncTimer !== null) {
      window.clearInterval(this.syncTimer);
      this.syncTimer = null;
    }
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

  play() {
    this.audio.play();
    this.setTimers();
    this.refresh();
  }

  pause() {
    this.audio.pause();
    this.clearTimers();
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
