import React from 'react'
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import App from './App.js';

import './styling/layout.scss';
import './styling/styling.scss';

ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'));