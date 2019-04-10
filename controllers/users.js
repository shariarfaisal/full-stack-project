const Users = require('../model/Users');
const bcrypt = require('bcrypt');
const userValidate = require('../validator/userValidator');
const updateValidator = require('../validator/updateValidator')
const loginValidator = require('../validator/loginValidator');

// Login user ...
const login = async (req,res) =>{
  let {email,password} = req.body;

  const validate = loginValidator({email,password});
  if(!validate.isValid) return res.status(400).send(validate.error);

  const user = await Users.findOne({email: email});
  if(!user) return res.status(400).send({message: "Email or Password doesn't match ."})

  const validatePass = await bcrypt.compare(password,user.password);
  if(!validatePass) return res.status(400).send({message: "Email or Password doesn't match ."})

  const token = user.getUserAuthToken()
  res.send(token);
}


/**
**   Create A New User ...
**/
const postUser = async (req,res) => {
  let {name,userName,email,password,confirmPassword} = req.body;
  // Validation input datas ...
  const validate = userValidate({name,userName,email,password,confirmPassword});
  if(!validate.isValid) return res.status(400).send(validate.error)

  // check email exist or not ...
  const checkExistEmail = await Users.findOne({email:email})
  if(checkExistEmail) return res.status(400).send({email: 'Email already exist!'})
  // check username unique or not  ...
  const checkUserNameUniqueOrNot = await Users.findOne({userName:userName})
  if(checkUserNameUniqueOrNot) return res.status(400).send({userName: 'User name should be unique!'})

  const user = new Users({name,userName,email,password});
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(password,salt);

  const result = await user.save();
  if(!result) return res.status(500).send('May be something went wrong in the server.')
  res.send(result);
}

/**
**   Get All the user ...
**/
const getAllUsers = async (req,res) => {
  const user = await Users.find();
  if(!user) return res.status(500).send('Server Error Occured')
  if(user.length === 0) return res.status(200).send('No data exist.')
  res.send(user);

}

/**
**  Get User By Id ...
**/

const getUserById = async (req,res) => {
  const user = await Users.findById(req.params.id);
  if(!user) return res.status(200).send({message: 'User not found !'})
  res.status(200).send(user);
}


/**
**  Get User By User Name ...
**/
const getUserByUserName = async (req,res) => {
  const user = await Users.findOne({userName:req.params.name});
  if(!user) return res.status(200).send({message: 'User not found !'})
  res.status(200).send(user);
}

/**
**  Update Single User data ...
**/

const updateUser = async (req,res) =>{
  let {name,email,userName,oldPassword,newPassword} = req.body;

  // check email exist or not ...
  const checkExistEmail = await Users.findOne({email:email})
  if(checkExistEmail && checkExistEmail._id != req.params.id){
    return res.status(200).send({email: 'Email already exist!'})
  }
  // check username unique or not  ...
  const checkUserNameUniqueOrNot = await Users.findOne({userName:userName})
  if(checkUserNameUniqueOrNot && checkUserNameUniqueOrNot._id != req.params.id){
    return res.status(200).send({userName: 'User name should be unique!'})
  }
  // Validation input datas ...
  const validate = updateValidator({name,userName,email,oldPassword,newPassword});
  if(!validate.isValid) return res.status(400).send(validate.error);

  // check old password right or wrong ...
  const oldData = await Users.findOne({_id:req.params.id});
  const validatePass = await bcrypt.compare(oldPassword,oldData.password);
  if(!validatePass) return res.status(400).send({password: 'Old Password does not match.'})

  // hashing password ...
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(newPassword,salt)

  const user = await Users.findByIdAndUpdate(req.params.id,{
    $set:{name,userName,email,password:hash}
  })
  if(!user) return res.status(500).send({message: 'Server Error Occured'})
  // find new data and show up ...
  const udatedData = await Users.findOne({_id:req.params.id});
  res.status(200).send(udatedData);
}

// Delete A Single User ....
const deleteUser = async (req,res) => {
  const user = await Users.findByIdAndDelete(req.params.id);
  if(!user){
    return res.status(200).send({message: 'User not found'})
  }
  res.status(200).send(user);
}

module.exports = {
  postUser,
  getAllUsers,
  getUserById,
  getUserByUserName,
  deleteUser,
  updateUser,
  login
}
