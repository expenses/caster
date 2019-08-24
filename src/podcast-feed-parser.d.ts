declare module 'podcast-feed-parser' {
  function getPodcastFromURL(string: url, options: Object<string, Object<string, string[]>>): Promise<Feed>;

  interface Feed {
    title: string;
    description: string;
    imageURL: string;
    episodes: Episode[];
  };

  interface Episode {
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
};
