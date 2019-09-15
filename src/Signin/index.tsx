import React from 'react';
import {CloudOff, Key} from 'react-feather';

import './index.scss';
import Picture from './Picture';

interface Props {
  signIn: () => void;
  tryAnonymously: () => void;
}

export default function Signin(props: Props) {
  const {signIn, tryAnonymously} = props;
  const blockstack = <a href='https://blockstack.org/'>Blockstack</a>;
  const tryBlockstack = 'https://blockstack.org/try-blockstack';

  return (
    <div className='signin'>
      <div className='signin-inner'>
        <h1>Caster is a encrypted, decentralised, syncing podcast player</h1>
        <p>(That's a mouthful)</p>
        <div className='intro'>
          <Picture className='intro-image' src='mobile_30_08_2019' />
          <div className='intro-text'>
            <h2>Here's how it works:</h2>
            <p>You can try out Caster by clicking the button below. In order to sync podcasts though, you'll need a {blockstack} identity. Making one is the same as signing up for any other online account, a process you've probably done hundreds of times.</p>
            <p>This will provide you with a <a href={tryBlockstack}>universal login</a> which you can use to access any Blockstack app. You'll also get a private encryption key, which is used to encrypt infomation about your podcast feeds.</p>
            <button onClick={signIn} type='button'>
              <Key />Create ID/Log In
            </button>
            <button onClick={tryAnonymously} type='button'>
              <CloudOff />Try without making an ID
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
