import * as request from 'request';
import * as parsePodcast from 'node-podcast-parser';

export function requestResource(proxy, url, callback) {
	request(url, (error, res, data) => {
	  if (error) {
	  	request(`${proxy}/${url}`, (error, res, data) => callback(error, data));
	  } else {
	  	callback(error, data);
	  }
    });
}

export function requestPodcast(proxy, url, callback) {
	requestResource(proxy, url, (error, data) => {
	  if (error) {
	  	callback(error, null);
	  } else {
	  	parsePodcast(data, (error, feed) => callback(error, feed));
	  }
    });
}

export function saveData(userSession, filename, data) {
	userSession.putFile(filename, JSON.stringify(data), {});
}

export function loadData(userSession, filename, callback) {
	userSession.getFile(filename, {})
		.then(content => callback(JSON.parse(content) || {}));
}
