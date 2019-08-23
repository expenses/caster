import React, { Component } from 'react';

import {LogOut, Home, Settings, Search, RefreshCw} from 'react-feather';

export default class Titlebar extends Component {
  render() {
    return (
      <div className="titlebar">
        <div className="titlebar-left">
          <LogOut onClick={this.props.logout} />
          <Settings onClick={this.props.settings} style={this.style(this.props.settingsOpen)} />
          <Home
            onClick={this.toHome}
            style={this.style(!this.state.selected && !this.state.search && !this.props.settingsOpen)}
          />
          <Search
            onClick={() => this.setState({search: true})}
            style={this.style(this.state.search && !this.props.settingsOpen)}
          />
          <h1>{this.title()}</h1>
        </div>
        <RefreshCw onClick={this.props.refresh} />
      </div>
    );
  }

  title() {
    if (this.state.search) {
      return 'Search episodes';
    } else if (this.state.selected) {
      return this.props.feeds[this.state.selected].data.meta.title;
    } else {
      return 'Podcasts';
    }
  }

  style(predicate) {
    return predicate ? {color: 'white'} : null;
  }
}
