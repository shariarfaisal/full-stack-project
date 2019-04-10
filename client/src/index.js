import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import store from './store';
import {Provider} from 'react-redux';
import App from './components/App';
import jwtDecode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
const token = localStorage.getItem('auth-token');
if(token){
  const decode = jwtDecode(token);
  setAuthToken(token);
  store.dispatch({
    type: 'SET_USER',
    payload:{
      user: decode
    }
  })
}


ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
