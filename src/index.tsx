import {AppConfig, UserSession} from 'blockstack';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Dashboard from './Dashboard';
import * as serviceWorker from './serviceWorker';
import Signin from './Signin';

import './podcast-feed-parser.d.ts';
import './react-scale-text.d.ts';
import './react-textfit.d.ts';

import './styling/mobile.scss';

import * as moment from 'moment';
import 'moment/min/locales';

// todo: settings
// todo: open episode save/load
// todo: testing

const appConfig = new AppConfig();
if (process.env.NODE_ENV === 'production') {
  appConfig.manifestPath = '/caster/manifest.json';
  appConfig.redirectPath = '/caster';
}

console.log(`Manifest path: ${appConfig.manifestURI()}`);
console.log(`Redirect path: ${appConfig.redirectURI()}`);

const userSession = new UserSession({appConfig});
// set locale
moment.locale(window.navigator.language);

class App extends Component<{}, {anonymous: boolean; }> {
  constructor(props: {}) {
    super(props);

    this.state = {
      anonymous: false
    };
  }

  signIn() {
    userSession.redirectToSignIn();
  }

  signOut() {
    userSession.signUserOut(window.location.origin);
  }

  render() {
    if (userSession.isUserSignedIn() || this.state.anonymous) {
      return <Dashboard userSession={userSession} signOut={this.signOut} />;
    } else {
      return <Signin signIn={this.signIn} tryAnonymously={() => this.setState({anonymous: true})}/>;
    }
  }

  componentDidMount() {
    if (userSession.isSignInPending()) {
      userSession.handlePendingSignIn().then(userData => {
        window.history.replaceState({}, document.title, '/');
      });
    }
  }
}

ReactDOM.render(<App/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// Done :^)
serviceWorker.register();
