import React, {Component} from 'react';

interface Props {
  image: string;
  title: string;
  body: any;
  onClick: () => void;
}

export default class Item extends Component<Props> {
  render() {
    return (
      <div className="item" onClick={this.props.onClick}>
        <img src={this.props.image} alt=""/>
        <div className="item-inner">
          <h2>{this.props.title}</h2>
          {this.props.body}
        </div>
      </div>
    );
  }
}
