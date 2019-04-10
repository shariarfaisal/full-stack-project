const validator = require('validator')

const loginValidate = (user) => {
  const validate = {
    error: {}
  }



  // Email ...
  if(!user.email){
    validate.error.loginEmail = "Field must not be empty!"
  }else if(!validator.isEmail(user.email)){
    validate.error.loginEmail = "Please enter a valid email."
  }

  // Password ...
  if(!user.password){
    validate.error.loginPassword = "Field must not be empty!"
  }else if(user.password < 6){
    validate.error.loginPassword = "Password character must be greater than or equal 6!"
  }


  if(Object.keys(validate.error).length !== 0){
    validate.isValid = false;
  }else{
    validate.isValid = true;
  }

  return validate;
}

module.exports = loginValidate;
