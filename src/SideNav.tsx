import React, { Component } from 'react';

import { slide as Slide } from 'react-burger-menu';
import {Home, Menu} from 'react-feather';

interface Properties {
  open: boolean;
  
}

export default class SideNav extends Component<Properties> {
  render() {
    return (
      <Slide
        isOpen={this.props.open}
        customBurgerIcon={<Menu/>}
        width="60%"
      >
        <SideNavItem icon={<Home/>} text="Home"/>
      </Slide>
    );
  }
}

class SideNavItem extends Component<{icon: any, text: string}> {
    render() {
      return <div className="sidenav-item">{this.props.icon}<p>{this.props.text}</p></div>;
    }
}
