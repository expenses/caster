import React from 'react';
// import {Plus} from 'react-feather';
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

export default function FeedsView(props: Props) {
  const {feeds, addFeed} = props;

  return (
    <>
      {
        Object.keys(feeds).map(url => <FeedItem key={url} url={url} {...props} />)
      }
      <div className='add-feed'>
        <TextEntry placeholder='Podcast Feed URL' callback={addFeed} />
        {/* <div className='add-feed-button' onClick={addFeed}><Plus /></div> */}
      </div>
    </>
  );
}
