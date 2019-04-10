
const init = {
  isAuthenticated: false,
  user: {},
  error: {},
  anotherUser:{}
}
const authReducer = (state = init,action) =>{
  switch(action.type){
    case 'SET_USER':{
      return {
        user: action.payload.user,
        error: {},
        isAuthenticated: Object.keys(action.payload.user).length !== 0,
        anotherUser: {}
      }
    }
    case 'USER_ERROR':{
      return {
        ...state,
        error: action.payload.error
      }
    }
    case 'ANOTHER_USER':{
      return {
        ...state,
        anotherUser: action.payload.anotherUser
      }
    }
    default: return state
  }
}

export default authReducer;
