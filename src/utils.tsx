import {getPodcastFromURL} from 'podcast-feed-parser';
import {UserSession} from 'blockstack';
import {Feed, EpisodeReference, Feeds} from './types';

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

export function saveData<T>(userSession: UserSession, filename: string, data: T): Promise<string> {
	return userSession.putFile(filename, JSON.stringify(data), {});
}

export async function loadData<T>(userSession: UserSession, filename: string): Promise<T> {
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

export function episodeImage(ref: EpisodeReference, feeds: Feeds): string {
	return ref.episode.imageURL || feeds[ref.feedUrl].data.meta.imageURL;
}
