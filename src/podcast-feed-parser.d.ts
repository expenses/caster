declare module 'podcast-feed-parser' {
  function getPodcastFromURL(string: url, options: Object<string, Object<string, string[]>>): Promise<Feed>;
};
