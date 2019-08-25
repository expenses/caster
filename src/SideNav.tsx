import React, { Component, MouseEvent } from 'react';

import { slide as Slide } from 'react-burger-menu';
import {Home, Search, Menu, Settings} from 'react-feather';
import {Feeds} from './types';

interface Properties {
  open: boolean;
  changeState: (open: boolean) => void;
  feeds: Feeds;
  openSettings: () => void;
  openHome: () => void;
  openFeed: (url: string) => void;
  openSearch: () => void;
}

export default class SideNavigation extends Component<Properties> {
  render() {
    let {open, feeds, openSettings, openHome, openFeed, openSearch, changeState} = this.props;

    return <>
      <Slide
        isOpen={open}
        customBurgerIcon={<Menu/>}
        width="60%"
        onStateChange={state => changeState(state.isOpen)}
      >
        <SideNavItem icon={<Home/>} text="Home" onClick={openHome} />
        <SideNavItem icon={<Search/>} text="Search" onClick={openSearch} />
        {
          Object.keys(feeds).map(url => {
            return <SideNavItem
              key={url}
              icon={<img src={feeds[url].data.meta.imageURL} alt=""/>}
              text={feeds[url].data.meta.title}
              onClick={e => {e.preventDefault();e.stopPropagation();openFeed(url)}}
            />;
          })
        }
        <SideNavItem icon={<Settings/>} text="Settings" onClick={openSettings} />
      </Slide>
    </>;
  }
}

class SideNavItem extends Component<{icon: any, text: string, onClick: (e: MouseEvent) => void}> {
    render() {
      return (
        <div
          onClick={this.props.onClick}
          className="sidenav-item"
        >
          <div className="sidenav-icon">
            {this.props.icon}
          </div>
          <p>{this.props.text}</p>
        </div>
      );
    }
}
