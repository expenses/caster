import {AppConfig, UserSession} from 'blockstack';
import * as moment from 'moment';
import 'moment/min/locales';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Dashboard from './Dashboard';
import * as serviceWorker from './serviceWorker';
import Signin from './Signin';

// type definitions for js modules
import './podcast-feed-parser.d.ts';
import './react-scale-text.d.ts';
import './react-textfit.d.ts';
// css
import './styling/basic.scss';

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

interface State {
  anonymous: boolean;
}

class App extends Component<{}, State> {
  constructor(props: {}) {
    super(props);

    this.state = {
      anonymous: false
    };
  }

  render() {
    if (userSession.isUserSignedIn() || this.state.anonymous) {
      return (
        <Dashboard
          userSession={userSession}
          signOut={() => userSession.signUserOut(appConfig.redirectURI())}
        />
      );
    }
    return (
      <Signin
        signIn={() => userSession.redirectToSignIn()}
        tryAnonymously={() => this.setState({anonymous: true})}
      />
    );
  }

  componentDidMount() {
    if (userSession.isSignInPending()) {
      userSession.handlePendingSignIn().then(() => {
        // There is probably a better way of thing this
        window.location.href = appConfig.redirectURI();
      });
    }
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// Done :^)
serviceWorker.register();
