export interface Tag {
  text: string,
  time: Date
}

export type FeedState = {data: Feed, time: Date};
export type Feeds = Record<string, FeedState>;
export type Tags = Record<string, Tag[]>;

export enum View {
  Main = 'Main',
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
};

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
  duration: string | null
  imageURL: string | null;
};
