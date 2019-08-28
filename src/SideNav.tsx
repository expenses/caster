import React from 'react';

import { slide as Slide } from 'react-burger-menu';
import {Home, LogOut, Menu, Search, Settings} from 'react-feather';
import SideNavItem from './SideNavItem';
import {Feeds} from './types';

import './SideNav.scss';

interface Props {
  open: boolean;
  changeState: (open: boolean) => void;
  feeds: Feeds;
  openSettings: () => void;
  openHome: () => void;
  openFeed: (url: string) => void;
  openSearch: () => void;
  signOut: () => void;
}

export default function SideNav(props: Props) {
  const {
    open, feeds, openSettings, openHome, openFeed, openSearch, changeState, signOut
  } = props;

  return (
    <div className='menu-button'>
      <Slide
        isOpen={open}
        customBurgerIcon={<Menu />}
        onStateChange={state => changeState(state.isOpen)}
      >
        <SideNavItem icon={<Home />} text='Home' onClick={openHome} />
        <SideNavItem icon={<Search />} text='Search' onClick={openSearch} />
        {
        Object.entries(feeds).map(([url, feed]) => (
          <SideNavItem
            key={url}
            icon={<img src={feed.data.meta.imageURL} alt='' />}
            text={feed.data.meta.title}
            onClick={e => {
              e.preventDefault();
              e.stopPropagation();
              openFeed(url);
            }}
          />
        ))
      }
        <SideNavItem icon={<Settings />} text='Settings' onClick={openSettings} />
        <SideNavItem icon={<LogOut />} text='Sign Out' onClick={e => signOut()} />
      </Slide>
    </div>
  );
}
