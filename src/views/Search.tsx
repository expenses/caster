import React, {Component} from 'react';
import fuzzysort from 'fuzzysort';
import {Feeds, EpisodeReference} from '../types';
import EpisodeItem from '../EpisodeItem';

interface Props {
  feeds: Feeds;
  openEpisode: (ref: EpisodeReference) => void;
}

export default class Search extends Component<Props, {searchTerm: string}> {
  constructor(props: Props) {
    super(props);

    this.state = {
      searchTerm: ''
    };
  }

  render() {
    let feeds = this.props.feeds;

    let episodes = Object.keys(feeds)
      .flatMap(feedUrl => feeds[feedUrl].data.episodes.map(episode => {
        return {
          ref: {episode, feedUrl},
          episode_title: episode.title,
          episode_description: episode.description
        }
      }));

    let options = {
      limit: 50,
      keys: ['episode_title', 'episode_description'],
      threshold: -500
    };

    let renderedEpisodes = fuzzysort.go(this.state.searchTerm, episodes, options)
      .map(result => <EpisodeItem
          key={result.obj.ref.episode.guid}
          episode={result.obj.ref}
          feeds={feeds}
          openEpisode={this.props.openEpisode}
      />);

    return <>
      <div className="search-body">{renderedEpisodes}</div>
      <input
        className="search-input"
        type="text"
        onChange={(e) => this.setState({searchTerm: e.target.value})}
        value={this.state.searchTerm}
      />
    </>;
  }
}
