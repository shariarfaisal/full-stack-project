import axios from 'axios';

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
