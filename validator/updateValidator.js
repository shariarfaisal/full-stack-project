const validator = require('validator')

const updateValidator = (user) => {
  const validate = {
    error: {}
  }

  // Name...
  if(!user.name){
    validate.error.name = "Field must not be empty!"
  }else if(user.name > 20){
    error.name = "Please provide your name within 20 character"
  }

  // User Name
  if(!user.userName){
    validate.error.userName = "Field must not be empty!"
  }else if(user.userName.length <3){
    validate.error.userName = "Character must be greater than 3 and less than 20!"
  }else if(user.userName.length > 20){
    validate.error.userName = "Character must be greater than 3 and less than 20!"
  }

  // Email ...
  if(!user.email){
    validate.error.email = "Field must not be empty!"
  }else if(!validator.isEmail(user.email)){
    validate.error.email = "Please enter a valid email."
  }

  // Old Password ...
  if(!user.oldPassword){
    validate.error.oldPassword = "Field must not be empty!"
  }

  // new Password
  if(!user.newPassword){
    validate.error.newPassword = "Field must not be empty !"
  }

  if(Object.keys(validate.error).length !== 0){
    validate.isValid = false;
  }else{
    validate.isValid = true;
  }

  return validate;
}

module.exports = updateValidator;
