import React, {Component} from 'react';

import { slide as Slide } from 'react-burger-menu';
import {Home, LogOut, Menu, Search, Settings} from 'react-feather';
import SideNavItem from './SideNavItem';
import {Feeds} from './types';

import './SideNav.scss';

interface Properties {
  open: boolean;
  changeState: (open: boolean) => void;
  feeds: Feeds;
  openSettings: () => void;
  openHome: () => void;
  openFeed: (url: string) => void;
  openSearch: () => void;
  signOut: () => void;
}

export default class SideNavigation extends Component<Properties> {
  render() {
    const {
      open, feeds, openSettings, openHome, openFeed, openSearch, changeState, signOut
    } = this.props;

    return <div className='menu-button'>
      <Slide
        isOpen={open}
        customBurgerIcon={<Menu/>}
        onStateChange={state => changeState(state.isOpen)}
      >
        <SideNavItem icon={<Home/>} text='Home' onClick={openHome} />
        <SideNavItem icon={<Search/>} text='Search' onClick={openSearch} />
        {
          Object.keys(feeds).map(url => {
            return <SideNavItem
              key={url}
              icon={<img src={feeds[url].data.meta.imageURL} alt=''/>}
              text={feeds[url].data.meta.title}
              onClick={e => {
                e.preventDefault();
                e.stopPropagation();
                openFeed(url);
              }}
            />;
          })
        }
        <SideNavItem icon={<Settings/>} text='Settings' onClick={openSettings} />
        <SideNavItem icon={<LogOut/>} text='Sign Out' onClick={e => signOut()} />
      </Slide>
    </div>;
  }
}
