
const allUserProfile = (state=[],action) => {
  switch(action.type){
    case 'ALL_PROFILE':{
      return action.payload.users
    }
    default: return state
  }

}

export default allUserProfile;
