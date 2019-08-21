import * as podcastFeedParser from 'podcast-feed-parser';

// https://github.com/jbierfeldt/podcast-feed-parser/blob/master/index.js#L17
// removed category and added guid
const options = {
	fields: {
    meta: ['title', 'description', 'subtitle', 'imageURL', 'lastUpdated', 'link',
            'language', 'editor', 'author', 'summary', 'owner',
            'explicit', 'complete', 'blocked'],
    episodes: ['title', 'description', 'subtitle', 'imageURL', 'pubDate',
            'link', 'language', 'enclosure', 'duration', 'summary', 'blocked',
            'explicit', 'order', 'guid']
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
