import React, { Component } from 'react';

import {Search, Plus} from 'react-feather';
import TextEntry from './TextEntry.js';

export default class BrowserInput extends Component {  
  render() {
    let search = this.props.search;

    if (search) {
      return (
        <div className = "browser-input">
          <Search/>
          <input
            placeholder="Search"
            onChange={(e) => this.props.onChange(e.target.value)}
            onKeyDown={e => e.stopPropagation()}
            value={this.props.searchTerm}
          />
        </div>
      );
    } else {
      return (
        <div className = "browser-input">
          <Plus/>
          <TextEntry
            placeholder="Add feed url"
            callback={this.props.addFeed}
            returnFocus={this.props.returnFocus}
          />
        </div>
      );
    }
  }
}
