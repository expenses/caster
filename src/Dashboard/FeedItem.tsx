import React from 'react';
import {XCircle} from 'react-feather';
import moment from 'moment';
import {Feeds} from './types';
import Item from './Item';

interface Props {
  feeds: Feeds;
  url: string;
  openFeed: (url: string) => void;
  deleteFeed: (url: string) => void;
}

export default function FeedItem(props: Props) {
  const {feeds, url, openFeed, deleteFeed} = props;
  const feed = feeds[url].data;

  return (
    <Item
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
}
