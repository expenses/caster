import React, { Component } from 'react';
import Main from './Main.js';
import Signin from './Signin.js';
import {
  UserSession,
  AppConfig
} from 'blockstack';

const appConfig = new AppConfig()
const userSession = new UserSession({ appConfig: appConfig })

export default class App extends Component {


  handleSignIn(e) {
    e.preventDefault();
    userSession.redirectToSignIn();
  }

  handleSignOut(e) {
    e.preventDefault();
    userSession.signUserOut(window.location.origin);
  }

  render() {
    if (userSession.isUserSignedIn()) {
      return <Main userSession={userSession} handleSignOut={ this.handleSignOut } />;
    } else {
      return <Signin userSession={userSession} handleSignIn={ this.handleSignIn } />;
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
