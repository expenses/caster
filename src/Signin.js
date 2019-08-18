import React, { Component } from 'react';

export default class Signin extends Component {

  render() {
    const { handleSignIn } = this.props;

    return (
      <div className="flexbox-vertical">
        <h1>Hello, Blockstack!</h1>
        <button onClick={ handleSignIn.bind(this) }>Sign In with Blockstack</button>
      </div>
    );
  }
}
