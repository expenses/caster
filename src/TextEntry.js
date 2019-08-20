import React, { Component } from 'react';

export default class TextEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {entered: ''};

    this.handleKey = this.handleKey.bind(this);
  }

  render() {
    return <input
    	type="text"
    	value={this.state.entered}
    	className={this.props.className}
    	onChange={(e) => this.setState({entered: e.target.value})}
    	onKeyDown={this.handleKey}
    	placeholder = {this.props.placeholder}
      ref={input => this.input = input}
    />;
  }

  handleKey(e) {
    e.stopPropagation();

  	if (e.key !== 'Enter') {
  		return;
  	}

  	let entered = this.state.entered;

  	if (entered) {
  		this.setState({entered: ''});
  		this.props.callback(entered);
      this.props.returnFocus.focus();
  	}
  }
}
