import React, {Component, MouseEvent, ReactElement} from 'react';

interface Props {
  icon: ReactElement;
  text: string;
  onClick: (e: MouseEvent) => void;
}

export default class SideNavItem extends Component<Props> {
    public render() {
      return (
        <div
          onClick={this.props.onClick}
          className='sidenav-item'
        >
          <div className='sidenav-icon'>
            {this.props.icon}
          </div>
          <p>{this.props.text}</p>
        </div>
      );
    }
}
