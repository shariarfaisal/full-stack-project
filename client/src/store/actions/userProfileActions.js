import Axios from 'axios';

export const userInfo = (userName) => dispatch => {
   Axios.get(`/api/users/friends/all`)
        .then(res =>{
          dispatch({
            type: 'ALL_PROFILE',
            payload:{
              users: res.data
            }
          })
        })
        .catch(err => {
          console.log(err.response.data);
        })

}
