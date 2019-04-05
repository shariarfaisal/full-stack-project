import axios from 'axios';
import jwtDecode from 'jwt-decode';
import setAuthToken from '../../utils/setAuthToken';
export const register = (user,history) => dispatch => {
  axios.post('/api/users/register',user)
        .then(data => {
          dispatch({
            type: 'USER_ERROR',
            payload: {
              error: {}
            }
          })
          history.push('/login');
        })
        .catch(err => {
          dispatch({
            type: 'USER_ERROR',
            payload: {
              error: err.response.data
            }
          })
        })
}


export const login = (user,history) => dispatch =>{
  axios.post('/api/users/login',user)
        .then(res => {
          const token = res.data.token;
          const decode = jwtDecode(token);
          setAuthToken(token);
          localStorage.setItem('auth_token',token);

          dispatch({
            type: 'SET_USER',
            payload: {
              user: decode
            }
          })
          history.push('/');
        })
        .catch(err => {
          dispatch({
            type: 'USER_ERROR',
            payload: {
              error: err.response.data
            }
          })
        })
}

export const logout = history =>{
  localStorage.removeItem('auth_token');
  history.push('/login')
  return {
    type: 'SET_USER',
    payload:{
      user: {}
    }
  }
}
