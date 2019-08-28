import React, {Component, ReactElement} from 'react';
import './Item.scss';

interface Props {
  image: string;
  title: string;
  body: ReactElement | string;
  onClick?: () => void;
  icons?: ReactElement;
  className?: string;
}

export default class Item extends Component<Props> {
  render() {
    const {className, onClick, image, title, body, icons} = this.props;

    return (
      <div className={`item ${className}`} onClick={onClick}>
        <div className='item-image'>
          <img src={image} alt=''/>
        </div>
        <div className='item-inner'>
          <h2>{title}</h2>
          {body}
        </div>
        <div className='item-icons'>
          {icons}
        </div>
      </div>
    );
  }
}
