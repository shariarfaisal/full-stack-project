import * as Types from './types';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import setAuthToken from '../../utils/setAuthToken';
export const register = (user,history) => dispatch => {
  axios.post('/api/users/register',user)
      .then(res => {
        dispatch({
          type: Types.USER_ERROR,
          payload: {
            error: {}
          }
        })
        history.push('/login')
      })
      .catch(err => {
        dispatch({
          type: Types.USER_ERROR,
          payload: {
            error: err.response.data
          }
        })
      })
}

export const login = (user,history) => dispatch =>{
  axios.post('/api/users/login',user)
        .then(res => {
          let token = res.data.token;
          localStorage.setItem('auth_token',token); //save token in localStorage
          let decode = jwtDecode(token);
          setAuthToken(token);
          dispatch({
            type: Types.SET_USER,
            payload: {
              user: decode
            }
          })
          history.push('/')
        })
        .catch(err => {
          dispatch({
            type: Types.USER_ERROR,
            payload: {
              error: err.response.data
            }
          })
        })
}

export const logout = history => {
  localStorage.removeItem('auth_token');
  history.push('/login');
  return {
    type: Types.SET_USER,
    payload: {
      user: {}
    }
  }
}
