// This only imports the interfaces afaik
import {AppConfig, UserSession} from 'blockstack';
import * as moment from 'moment';
import 'moment/min/locales';
import React, {Component, Suspense} from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import Signin from './Signin';

// type definitions for js modules
import './podcast-feed-parser.d.ts';
import './react-scale-text.d.ts';
import './react-textfit.d.ts';
// css
import 'typeface-montserrat';
import './styling/basic.scss';

// todo: testing

// set locale
moment.locale(window.navigator.language);
// Lazy load the dashboard
const Dashboard = React.lazy(() => import('./Dashboard'));

interface State {
  anonymous: boolean;
  userSession: UserSession | null;
  appConfig: AppConfig | null;
}

class App extends Component<{}, State> {
  constructor(props: {}) {
    super(props);

    this.state = {
      anonymous: false,
      userSession: null,
      appConfig: null
    };
  }

  render() {
    const {userSession, anonymous, appConfig} = this.state;

    const signedIn = userSession && userSession.isUserSignedIn();

    if (signedIn || anonymous) {
      return (
        <Suspense fallback={<></>}>
          <Dashboard
            userSession={userSession}
            signOut={() => (
              userSession && appConfig ? userSession.signUserOut(appConfig.redirectURI()) : null
            )}
          />
        </Suspense>
      );
    }
    return (
      <Signin
        signIn={() => (
          userSession ? userSession.redirectToSignIn() : null
        )}
        tryAnonymously={() => this.setState({anonymous: true})}
      />
    );
  }

  componentDidMount() {
    // Dynamically import blockstack
    import('blockstack')
      .then(blockstack => {
        const appConfig = new blockstack.AppConfig();

        if (process.env.NODE_ENV === 'production') {
          appConfig.manifestPath = '/caster/manifest.json';
          appConfig.redirectPath = '/caster';
        }

        console.log(`Manifest path: ${appConfig.manifestURI()}`);
        console.log(`Redirect path: ${appConfig.redirectURI()}`);

        const userSession = new blockstack.UserSession({appConfig});

        if (userSession.isSignInPending()) {
          userSession.handlePendingSignIn().then(() => {
            // There is probably a better way of thing this
            window.location.href = appConfig.redirectURI();
          });
        }

        this.setState({userSession, appConfig});
      });
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// Done :^)
serviceWorker.register();
