import {combineReducers} from 'redux';
import authReducer from './authReducer';
import allUser from './userProfile';
export default combineReducers({
  auth: authReducer,
  users: allUser
})
