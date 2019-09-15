import React from 'react';
import {Plus} from 'react-feather';
import TextEntry from '../TextEntry';
import {Feeds} from '../types';
import FeedItem from '../FeedItem';

import './FeedsView.scss';

interface Props {
  feeds: Feeds;
  openFeed: (url: string) => void;
  addFeed: (url: string) => void;
  deleteFeed: (url: string) => void;
}

export default React.memo((props: Props) => {
  const {feeds, addFeed} = props;

  return (
    <>
      {
        Object.keys(feeds).map(url => <FeedItem key={url} url={url} {...props} />)
      }
      <div className='add-feed'>
        <Plus />
        <TextEntry placeholder='Podcast Feed URL' callback={addFeed} />
      </div>
    </>
  );
});
