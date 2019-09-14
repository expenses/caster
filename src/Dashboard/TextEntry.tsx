import React, { Component, KeyboardEvent } from 'react';

interface Props {
  defaultValue?: string;
  className?: string;
  placeholder?: string;
  callback: (value: string) => void;
}

export default class TextEntry extends Component<Props, {entered: string}> {
  constructor(props: Props) {
    super(props);
    this.state = {entered: props.defaultValue || ''};

    this.handleKey = this.handleKey.bind(this);
  }

  render() {
    const {className, placeholder} = this.props;

    return (
      <input
        type='text'
        value={this.state.entered}
        className={className}
        onChange={e => this.setState({entered: e.target.value})}
        onKeyDown={this.handleKey}
        placeholder={placeholder}
      />
    );
  }

  handleKey(e: KeyboardEvent) {
    e.stopPropagation();

    if (e.key !== 'Enter') {
      return;
    }

    const {entered} = this.state;

    if (entered) {
      this.setState({entered: ''});
      this.props.callback(entered);
    }
  }
}