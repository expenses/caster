import React, {Component, ReactElement} from 'react';
import {RotateCcw} from 'react-feather';

import isUrl from 'is-url-superb';
import {DEFAULT_SETTINGS, Settings} from '../types';


import './SettingsView.scss';

interface Props {
  settings: Settings;
  updateSettings: (updates: object, valid: boolean) => void;
}

export default class SettingsView extends Component<Props> {
  render(): ReactElement {
    const {settings, updateSettings} = this.props;
    const {corsProxy, toggle, seekBackwards, seekForwards} = settings;

    const helpUrl = 'https://devcenter.heroku.com/articles/getting-started-with-nodejs';
    const defaultUrl = 'https://caster-cors-proxy.herokuapp.com';
    const corsAnywhere = 'https://caster-cors-proxy.herokuapp.com';

    return (
      <div className='settings'>
        <p>Many websites do not allow you to request RSS feeds from inside a browser, so you need to use a proxy to access them. I've set up {defaultUrl} which you are totally free to use, but if you want to setup a proxy yourself you can follow <a href={helpUrl}>this guide</a> with the <a href={corsAnywhere}>CORS Anywhere</a>.</p>
        <label>CORS Proxy:</label>
        <input
          type='url'
          pattern='https?://.*'
          value={corsProxy}
          onChange={e => this.updateProxy(e.target.value)}
          style={style(isUrl(corsProxy))}
        />
        <label>Pause/Play Toggle:</label>
        <input
          type='text'
          value={toggle}
          style={style(fixCharacter(toggle)[1])}
          onChange={e => this.updateCharacter('toggle', e.target.value)}
        />
        <label>Seek Backwards:</label>
        <input
          type='text'
          value={seekBackwards}
          style={style(fixCharacter(seekBackwards)[1])}
          onChange={e => this.updateCharacter('seekBackwards', e.target.value)}
        />
        <label>Seek Forwards:</label>
        <input
          type='text'
          value={seekForwards}
          style={style(fixCharacter(seekForwards)[1])}
          onChange={e => this.updateCharacter('seekForwards', e.target.value)}
        />
        <button
          type='reset'
          onClick={() => updateSettings(DEFAULT_SETTINGS, true)}
        >
          <RotateCcw />
        Reset
        </button>
      </div>
    );
  }

  updateProxy(url: string) {
    this.props.updateSettings({corsProxy: url}, isUrl(url));
  }

  updateCharacter(key: string, string: string) {
    const [character, valid] = fixCharacter(string);
    this.props.updateSettings({[key]: character}, valid);
  }
}

function fixCharacter(characters: string): [string, boolean] {
  if (characters.length > 0) {
    return [characters[characters.length - 1].toLowerCase(), true];
  }
  return ['', false];
}

function style(valid: boolean): {border: string} {
  return {
    border: `1px solid ${valid ? 'green' : 'red'}`
  };
}
