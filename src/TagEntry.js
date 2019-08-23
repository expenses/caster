import React, { Component } from 'react';

import {Plus} from 'react-feather';
import TextEntry from './TextEntry.js';

export default class TagEntry extends Component {
  render() {
    return (
      <div className="tag-entry">
        <div className="tag-entry-inner">
          <Plus/>
          <TextEntry
            placeholder="Enter Tag"
            callback={this.props.addTag}
            ref={ref => this.input = ref}
            returnFocus={this.props.dashboard}
          />
        </div>
      </div>
    );
  }

  focus() {
    this.input.focus();
  }
}
