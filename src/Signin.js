import React, { Component } from 'react';

import {Headphones, LogIn} from 'react-feather';

export default class Signin extends Component {

  render() {
    const { handleSignIn } = this.props;

    return (
      <div className="signin-outer">
        <div className="signin">
          <Headphones size="150px" />
          <h1>Log in with Blockstack:</h1>
          <button
            className="signin-button"
            onClick={ handleSignIn.bind(this) }
          >
            <LogIn/><p>Sign up/Log in</p>
          </button>
        </div>
      </div>
    );
  }
}
