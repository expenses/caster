import React from 'react';

import { slide as Slide } from 'react-burger-menu';
import {Home, LogOut, Menu, Search, Settings} from 'react-feather';
import SideNavItem from './SideNavItem';

import './SideNav.scss';

interface Props {
  open: boolean;
  changeState: (open: boolean) => void;
  openSettings: () => void;
  openHome: () => void;
  openSearch: () => void;
  signOut: () => void;
}

function SideNav(props: Props) {
  const {
    open, openSettings, openHome, openSearch, changeState, signOut
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
        <SideNavItem icon={<Settings />} text='Settings' onClick={openSettings} />
        <SideNavItem icon={<LogOut />} text='Sign Out' onClick={signOut} />
      </Slide>
    </div>
  );
}

export default React.memo(SideNav);
