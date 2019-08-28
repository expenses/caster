export interface FeedState {data: Feed; time: Date; }
export type Feeds = Record<string, FeedState>;

export enum View {
  Feeds = 'Feeds',
  Settings = 'Settings',
  Viewing = 'Viewing',
  Search = 'Search',
}

export interface EpisodeReference {
  feedUrl: string;
  episode: Episode;
}

export interface Feed {
  meta: {
    title: string;
    description: string;
    imageURL: string;
  };
  episodes: Episode[];
}

export interface Episode {
  title: string;
  description: string;
  pubDate: string;
  enclosure: {
    length: number;
    type: string;
    url: string;
  };
  guid: string;
  duration: string | null;
  imageURL: string | null;
}

export interface Playing {
  epRef: EpisodeReference;
  time: number;
  paused: boolean;
}

export interface Settings {
  corsProxy: string;
  toggle: string;
  seekBackwards: string;
  seekForwards: string;
}

export const DEFAULT_SETTINGS = {
  corsProxy: 'https://caster-cors-proxy.herokuapp.com',
  toggle: 'p',
  seekBackwards: ',',
  seekForwards: '.'
};
