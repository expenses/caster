import {getPodcastFromURL, Feed} from 'podcast-feed-parser';
import {UserSession} from 'blockstack';

// https://github.com/jbierfeldt/podcast-feed-parser/blob/master/index.js#L17
// removed category and added guid
const options = {
	fields: {
    meta: ['title', 'description', 'imageURL'],
    episodes: ['title', 'description', 'imageURL', 'pubDate', 'enclosure', 'duration', 'guid']
  },

	required: {
		meta: ['title', 'description'],
		episodes: []
	}
}

export async function requestPodcast(proxy: string, url: string): Promise<Feed> {
	return getPodcastFromURL(`${proxy}/${url}`, options);
}

export function saveData(userSession: UserSession, filename: string, data: Object): Promise<string> {
	return userSession.putFile(filename, JSON.stringify(data), {});
}

export async function loadData(userSession: UserSession, filename: string): Promise<Object> {
	return userSession.getFile(filename, {})
		.then(content => {
			if (content instanceof ArrayBuffer) {
				// todo: error
				return {};
			} else {
				return JSON.parse(content) || {};
			}
		})
}
