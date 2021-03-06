import fuzzysort from 'fuzzysort';
import React, {PureComponent} from 'react';
import {Search} from 'react-feather';
import EpisodeItem from '../EpisodeItem';
import {EpisodeReference, Feeds} from '../types';

import './SearchView.scss';

interface Props {
  feeds: Feeds;
  openEpisode: (ref: EpisodeReference) => void;
  playEpisode: (ref: EpisodeReference) => void;
}

interface State {
  searchTerm: string;
}

export default class SearchView extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      searchTerm: ''
    };
  }

  render() {
    const {feeds} = this.props;
    const {searchTerm} = this.state;

    const episodes = Object.keys(feeds)
      .flatMap(feedUrl => feeds[feedUrl].data.episodes.map(episode => ({
        ref: {episode, feedUrl},
        episodeTitle: episode.title,
        episodeDescription: episode.description
      })));

    const options = {
      limit: 50,
      keys: ['episodeTitle', 'episodeDescription'],
      threshold: -500
    };

    const renderedEpisodes = fuzzysort.go(searchTerm, episodes, options)
      .map(result => (
        <EpisodeItem
          key={result.obj.ref.episode.guid}
          episode={result.obj.ref}
          {...this.props}
        />
      ));

    return (
      <div className='search'>
        <div className='search-body'>
          {renderedEpisodes.length ? renderedEpisodes : <h1>No Search Term Entered</h1>}
        </div>
        <div className='search-input'>
          <Search />
          <input
            type='text'
            placeholder='Search Term'
            onChange={e => this.setState({searchTerm: e.target.value})}
            value={searchTerm}
          />
        </div>
      </div>
    );
  }
}
