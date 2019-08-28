import React from 'react';
import {CloudOff, LogIn} from 'react-feather';

import './Signin.scss';

interface Props {
  signIn: () => void;
  tryAnonymously: () => void;
}

export default function Signin(props: Props) {
  const {signIn, tryAnonymously} = props;

  return (
    <div className='signin'>
      <div className='signin-inner'>
        <h1>Caster is a encrypted, decentralised, syncing podcast player</h1>
        <p>(That's a mouthful)</p>
        <button onClick={signIn} type='button'>
          <LogIn />Create ID/Log In
        </button>
        <button onClick={tryAnonymously} type='button'>
          <CloudOff />Try without making an ID
        </button>
        <h2>Here's how it works:</h2>
        <p>First, you'll need a Blockstack identity, which you can do by creating the button above. Making one is the same as signing up for any other online account, a process you've probably done hundreds of times.</p>
        <p>Blockstack is unique though because you can use this ID to log into any other Blockstack app, of which there are quite a few.</p>
      </div>
    </div>
  );
}
