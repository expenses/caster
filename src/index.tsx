import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Dashboard from './Dashboard';
import Signin from './Signin.js';
import {
  UserSession,
  AppConfig
} from 'blockstack';

import './react-audio-player.d.ts';
import './podcast-feed-parser.d.ts';

//import './styling/layout.scss';
//import './styling/styling.scss';
import './styling/mobile.scss';


import * as moment from 'moment';
import 'moment/min/locales';

// todo: mobile first restyling
// - Hamburger menu
// -- <home> main
// -- <Pod A>
// -- <Pod B>
// -- Search
// -- Settings
// -- Add Podcast
// - Top menu
// -- Refresh
// - Bottom Menu
// -- Currently Planing
//todo: settings
//todo: autotagging
//todo: open episode save/load
//todo: testing

const appConfig = new AppConfig();
if (process.env.NODE_ENV === 'production') {
  appConfig.manifestPath = "/caster/manifest.json";
  appConfig.redirectPath = "/caster";
}

console.log(`Manifest path: ${appConfig.manifestURI()}`);
console.log(`Redirect path: ${appConfig.redirectURI()}`);

const userSession = new UserSession({ appConfig: appConfig });
// set locale
moment.locale(window.navigator.language);


class App extends Component {
  handleSignIn(e: Event) {
    e.preventDefault();
    userSession.redirectToSignIn();
  }

  handleSignOut(e: Event) {
    e.preventDefault();
    userSession.signUserOut(window.location.origin);
  }

  render() {
    if (userSession.isUserSignedIn()) {
      return <Dashboard userSession={userSession} handleSignOut={this.handleSignOut} />;
    } else {
      return <Signin handleSignIn={this.handleSignIn} />;
    }
  }

  componentDidMount() {
    if (userSession.isSignInPending()) {
      userSession.handlePendingSignIn().then((userData) => {
        window.history.replaceState({}, document.title, "/")
        this.setState({ userData: userData})
      });
    }
  }
}

ReactDOM.render(<App/>, document.getElementById('root'));
