import * as request from 'request';
import * as parsePodcast from 'node-podcast-parser';

const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';

export function requestResource(url, callback) {
	request(url, (error, res, data) => {
	  if (error) {
	  	request(CORS_PROXY + url, (error, res, data) => callback(error, data));
	  } else {
	  	callback(error, data);
	  }
    });
}

export function requestPodcast(url, callback) {
	requestResource(url, (error, data) => {
	  if (error) {
	  	callback(error, null);
	  } else {
	  	parsePodcast(data, (error, feed) => callback(error, feed));
	  }
    });
}