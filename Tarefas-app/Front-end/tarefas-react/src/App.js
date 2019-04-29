import React from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'font-awesome/css/font-awesome.min.css';
import './App.css';

import Menu from './Template/Menu/Menu';
import Routes from './routes';

export default function App() {
  var history = createBrowserHistory();

  return (
    <Router history={history}>
    <div className="App">
      <Menu/>
      <Routes/>
    </div>
    </Router>
  );
}
