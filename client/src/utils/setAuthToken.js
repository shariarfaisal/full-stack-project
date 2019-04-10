import Axios from 'axios';

const setAuthToken = (token) => {
  if(token){
    Axios.defaults.headers.common['x-auth-token'] = token;
  }else{
    Axios.defaults.headers.common['x-auth-token'] = ''
  }
}

export default setAuthToken;
