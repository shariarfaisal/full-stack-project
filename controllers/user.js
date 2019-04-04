const User = require('../model/User');
const registerValidator = require('../validator/registerValidator')


// Create User Section ...
const postUser = (req,res,next) => {
  let {name,email,password,confirmPassword} = req.body;
  let validate = registerValidator({name,email,password,confirmPassword});
  if(!validate.isValid){
    res.status(400).json(validate.error)
  }else{
    res.status(200).json({
      message: 'Everything is ok'
    })
  }
  // let user = new User({
  //   name: name,
  //   email: email,
  //   password: password
  // })
}

module.exports = {
  postUser
}
