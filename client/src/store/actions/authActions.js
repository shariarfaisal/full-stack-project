import Axios from 'axios';
import jwtDecode from 'jwt-decode';
import setAuthToken from '../../utils/setAuthToken';
export const register = (user,history) => dispatch => {
   Axios.post('/api/users/register',user)
        .then(res => {
          dispatch({
            type: 'USER_ERROR',
            payload: {
              error: {}
            }
          })
          history.push('/user/login');
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



export const login = (user,history) => dispatch => {
  Axios.post('/api/users/login',user)
  .then(res => {
    const token = res.data;
    localStorage.setItem('auth-token',token);
    const decode = jwtDecode(token);
    setAuthToken(token);
    dispatch({
      type: 'SET_USER',
      payload: {
        user: decode
      }
    })
    history.push('/')
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

export const logout = (history) => {
  const token = localStorage.removeItem('auth-token');
  console.log(history);
  history.push('/user/login');
  return {
    type: 'SET_USER',
    payload: {
      user: {},
      anotherUser: {}
    }
  }
}

export const userInfo = (userName) => dispatch => {
   Axios.get(`/api/users/profile/${userName}`)
        .then(res => {
          dispatch({
            type: 'ANOTHER_USER',
            payload: {
              anotherUser: res.data
            }
          })
        })
        .catch(err => {
          console.log(err.response.data);
        })
}
