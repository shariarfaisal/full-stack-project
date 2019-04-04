import * as Types from './types';
import axios from 'axios';

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
