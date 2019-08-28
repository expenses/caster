import fuzzysort from 'fuzzysort';
import React, {Component} from 'react';
import {Search as SearchIcon} from 'react-feather';
import EpisodeItem from '../EpisodeItem';
import {EpisodeReference, Feeds} from '../types';

import './Search.scss';

interface Props {
  feeds: Feeds;
  openEpisode: (ref: EpisodeReference) => void;
  playEpisode: (ref: EpisodeReference) => void;
}

export default class Search extends Component<Props, {searchTerm: string}> {
  constructor(props: Props) {
    super(props);

    this.state = {
      searchTerm: ''
    };
  }

  render() {
    const feeds = this.props.feeds;

    const episodes = Object.keys(feeds)
      .flatMap(feedUrl => feeds[feedUrl].data.episodes.map(episode => {
        return {
          ref: {episode, feedUrl},
          episode_title: episode.title,
          episode_description: episode.description
        };
      }));

    const options = {
      limit: 50,
      keys: ['episode_title', 'episode_description'],
      threshold: -500
    };

    const renderedEpisodes = fuzzysort.go(this.state.searchTerm, episodes, options)
      .map(result => <EpisodeItem
          key={result.obj.ref.episode.guid}
          episode={result.obj.ref}
          feeds={feeds}
          openEpisode={this.props.openEpisode}
          playEpisode={this.props.playEpisode}
      />);

    return <div className='search'>
      <div className='search-body'>{renderedEpisodes}</div>
      <div className='search-input'>
        <SearchIcon/>
        <input
          type='text'
          placeholder='Search Term'
          onChange={e => this.setState({searchTerm: e.target.value})}
          value={this.state.searchTerm}
        />
      </div>
    </div>;
  }
}
