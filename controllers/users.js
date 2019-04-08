const Users = require('../model/Users');
const bcrypt = require('bcrypt');
const userValidate = require('../validator/userValidator');

// Create A New User ...
const postUser = async (req,res) => {
  let {name,userName,email,password,confirmPassword} = req.body;

  // check email exist or not ...
  const checkExistEmail = await Users.findOne({email:email})
  if(checkExistEmail){
    return res.status(200).send({email: 'Email already exist!'})
  }
  // check username unique or not  ...
  const checkUserNameUniqueOrNot = await Users.findOne({userName:userName})
  if(checkUserNameUniqueOrNot){
    return res.status(200).send({userName: 'User name should be unique!'})
  }
  // Validation input datas ...
  const validate = userValidate({name,userName,email,password,confirmPassword});
  if(!validate.isValid){
    return res.status(400).send(validate.error)
  }

  const user = new Users({name,userName,email,password});
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(password,salt);

  const result = await user.save();
  if(!result){
    return res.status(500).send('May be something went wrong in the server.')
  }
  res.send(result);
}

// Get All the user ...
const getAllUsers = async (req,res) => {
  const user = await Users.find();
  if(!user){
    return res.status(500).send('Server Error Occured')
  }
  if(user.length === 0){
    return res.status(200).send('No data exist.')
  }
  res.send(user);

}

//Get User By Id ...
const getUserById = async (req,res) => {
  const user = await Users.findById(req.params.id);
  if(!user){
    return res.status(200).send({message: 'User not found !'})
  }
  res.status(200).send(user);
}

//Get User By User Name ...
const getUserByUserName = async (req,res) => {
  const user = await Users.findOne({userName:req.params.name});
  if(!user){
    return res.status(200).send({message: 'User not found !'})
  }
  res.status(200).send(user);
}

// Update Single User data ...
const updadteUser = async (req,res) =>{
  let {name,email,userName,password,confirmPassword} = req.body;

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
  const validate = userValidate({name,userName,email,password,confirmPassword});
  if(!validate.isValid){
    return res.status(400).send(validate.error)
  }

  const user = await Users.findByIdAndUpdate(req.params.id,{
    $set:{name,userName,email,password,confirmPassword}
  })
  if(!user){
    return res.status(500).send({message: 'Server Error Occured'})
  }
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
  updadteUser
}
