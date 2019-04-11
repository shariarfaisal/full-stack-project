import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Routes from './Routes';
import './resources/css/app.css';
import {BrowserRouter as Router} from 'react-router-dom';
const  App = () => (
  <Router>
    <Routes />
  </Router>
)
ReactDOM.render(<App />, document.getElementById('root'));
