import * as podcastFeedParser from 'podcast-feed-parser';

// https://github.com/jbierfeldt/podcast-feed-parser/blob/master/index.js#L17
// removed category and added guid
const options = {
	fields: {
    meta: ['title', 'description', 'imageURL'],
    episodes: ['title', 'description', 'imageURL', 'pubDate', 'enclosure', 'duration', 'guid']
  }
}

export async function requestPodcast(proxy, url) {
	return podcastFeedParser.getPodcastFromURL(`${proxy}/${url}`, options);
}

export function saveData(userSession, filename, data) {
	userSession.putFile(filename, JSON.stringify(data), {});
}

export async function loadData(userSession, filename) {
	return userSession.getFile(filename, {})
		.then(content => JSON.parse(content) || {})
}
