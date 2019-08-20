import React, { Component } from 'react';

import ReactModal from 'react-modal';
import {ChevronLeft} from 'react-feather';
import TextEntry from './TextEntry.js';

export default class Settings extends Component {
  render() {
    let settings = this.props.settings;

    return (
      <ReactModal
        className="settings-modal"
        overlayClassName="settings-modal-overlay"
        isOpen={this.props.open}
      >
        <div className="settings-title">
          <ChevronLeft onClick={this.props.close}/>
          <h2>Settings</h2>
        </div>
        <div className="settings-content">
          <p>CORS Proxy Url:</p>
          <TextEntry defaultValue={settings.corsProxy} />
          <h3>Key Bindings</h3>
          <p>Play/Pause</p>
          <TextEntry defaultValue={settings.toggle} />
        </div>
      </ReactModal>
    );
  }
}
