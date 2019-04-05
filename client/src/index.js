import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Provider} from 'react-redux';
import store from './store';
import App from './components/App';
import * as Types from './store/actions/types';
import jwtDecode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';


const token = localStorage.getItem('auth_token');
if(token){
  let decode = jwtDecode(token);
  setAuthToken(token);
  store.dispatch({
    type: Types.SET_USER,
    payload: {
      user: decode
    }
  })
}

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
