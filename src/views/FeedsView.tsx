import moment from 'moment';
import React, {Component} from 'react';
import {Plus, XCircle} from 'react-feather';
import Item from '../Item';
import TextEntry from '../TextEntry';
import {Feeds} from '../types';

import './FeedsView.scss';

interface Props {
  feeds: Feeds;
  openFeed: (url: string) => void;
  addFeed: (url: string) => void;
  deleteFeed: (url: string) => void;
}

export default class FeedsView extends Component<Props> {
  render() {
    const {feeds, openFeed, addFeed, deleteFeed} = this.props;

    const items = Object.keys(feeds)
      .map(url => {
        const feed = feeds[url].data;

        return (
          <Item
            key={url}
            title={feed.meta.title}
            image={feed.meta.imageURL}
            body={(
              <>
                <p>{feed.meta.description}</p>
                <p>{feed.episodes.length} episodes</p>
                <p>Last refreshed {moment(feeds[url].time).fromNow()}</p>
              </>
            )}
            onClick={() => openFeed(url)}
            icons={(
              <XCircle onClick={e => {
                e.stopPropagation();
                deleteFeed(url);
              }}
              />
)}
          />
        );
      });

    return (
      <>
        {items}
        <div className='add-feed'>
          <Plus />
          <TextEntry placeholder='Podcast Feed URL' callback={addFeed} />
        </div>
      </>
    );
  }
}
