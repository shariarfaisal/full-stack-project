const User = require('../model/User');
const registerValidator = require('../validator/registerValidator')
const bcrypt = require('bcrypt');

// Create User Section ...
const postUser = (req,res,next) => {
  let {name,email,password,confirmPassword} = req.body;
  let validate = registerValidator({name,email,password,confirmPassword});
  if(!validate.isValid){
    res.status(400).json(validate.error)
  }else{
    User.findOne({email})
        .then(user => {
            if(user){
              return res.status(400).json({
                message: 'Email Already Exist'
              })
            }

            bcrypt.hash(password,11,(err,hash) => {
                if(err){
                  return res.status(500).json({
                    message: 'Server Eroor Occured'
                  })
                }


                let user = new User({
                  name,
                  email,
                  password: hash
                })
                user.save()
                    .then(user => {
                      res.status(201).json({
                        message: 'User Created Successfully',
                        user 
                      })
                    })


            })


        })
        .catch(err => {
          res.send(500).json({
            message: 'Server Error Occured'
          })
        })
  }
}

module.exports = {
  postUser
}
