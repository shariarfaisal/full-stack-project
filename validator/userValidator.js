const validator = require('validator')

const userValidate = (user) => {
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
  }else if(user.email < 6){
    validate.error.email = "Please provide a valid email!"
  }else if(user.email > 200){
    validate.error.email = "Please provide a valid email!"
  }

  // Password ...
  if(!user.password){
    validate.error.password = "Field must not be empty!"
  }else if(user.password < 6){
    validate.error.password = "Password character must be greater than or equal 6!"
  }

  // Confirm Password
  if(!user.confirmPassword){
    validate.error.confirmPassword = "Field must not be empty !"
  }else if(user.password !== user.confirmPassword){
    validate.error.confirmPassword = "Does't match your password."
  }

  if(Object.keys(validate.error).length !== 0){
    validate.isValid = false;
  }else{
    validate.isValid = true;
  }

  return validate;
}

module.exports = userValidate;
