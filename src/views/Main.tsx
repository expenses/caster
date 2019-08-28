import React, {Component, MouseEvent} from 'react';
import moment from 'moment';
import {Plus, XCircle} from 'react-feather';
import {Feeds} from '../types';
import Item from '../Item';
import TextEntry from '../TextEntry';

interface Props {
  feeds: Feeds;
  openFeed: (url: string) => void;
  addFeed: (url: string) => void;
  deleteFeed: (url: string) => void;
}

export default class Main extends Component<Props> {
  render() {
    let feeds = this.props.feeds;

    let items = Object.keys(feeds)
      .map(url => {
        let feed = feeds[url].data;

        return <Item
          key={url}
          title={feed.meta.title}
          image={feed.meta.imageURL}
          body={<>
            <p>{feed.meta.description}</p>
            <p>{feed.episodes.length} episodes</p>
            <p>Last refreshed {moment(feeds[url].time).fromNow()}</p>
          </>}
          onClick={() => this.props.openFeed(url)}
          icons={<XCircle onClick={e => this.deleteUrl(e, url)}/>}
        />;
      });

    return <>
      {items}
      <div className="add-feed">
        <Plus/>
        <TextEntry placeholder="Podcast Feed URL" callback={this.props.addFeed}/>
      </div>
    </>;
  }

  deleteUrl(e: MouseEvent, url: string) {
    e.stopPropagation();
    this.props.deleteFeed(url);
  }
}
