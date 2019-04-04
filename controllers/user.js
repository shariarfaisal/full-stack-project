const User = require('../model/User');
const registerValidator = require('../validator/registerValidator')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const loginValidator = require('../validator/loginValidator')
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


// login user ..

const loginUser = (req,res,next) => {
  let {email,password} = req.body;
  let validate = loginValidator({email,password})

  if(!validate.isValid){
      return res.status(400).json(validate.error)
  }

  User.findOne({email})
      .then(user => {
        if(!user){
          return res.status(400).json({
            message: 'User not found'
          })
        }
        bcrypt.compare(password,user.password,(err,result) => {
          if(err){
            return res.status(500).send('Server Error Occured')
          }
          if(!result){
            return res.status(400).send("password does't match.")
          }

          let token = jwt.sign({_id: user._id,name: user.name,email:user.email},'secret',{expiresIn: '2h'})

          res.status(200).json({
            message: 'Login successfull ',
            token: `Bearer ${token}`
          })
        })
      })
      .catch(err => {
        res.status(500).send(err.message)
      })
}

module.exports = {
  postUser,
  loginUser
}
