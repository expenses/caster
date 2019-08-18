import React, { Component } from 'react';

export default class TagEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
    	tempTag: ''
    };

    this.handleKey = this.handleKey.bind(this);
  }

  render() {
    return <input
    	type="text"
    	value={this.state.tempTag}
    	className={this.props.className}
    	onChange={(e) => this.setState({tempTag: e.target.value})}
    	onKeyDown={this.handleKey}
    	placeholder = "Enter tag:"
    />;
  }

  handleKey(e) {
  	if (e.key !== 'Enter') {
  		return;
  	}

  	let tag = this.state.tempTag;

  	if (tag) {
  		this.setState({tempTag: ''});
  		this.props.callback(tag);
  	}
  }
}
