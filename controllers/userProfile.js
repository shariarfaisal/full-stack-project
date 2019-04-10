const Users = require('../model/Users');

const userInfoByUserName = async (req,res) =>{
  const info = await Users.findOne({userName:req.params.userName}).select('-password');
  if(!info) return res.status(400).send({message: 'User not found'})
  res.send(info)
}

const allUserProfile = async (req,res) => {
  const user = await Users.find().select('-password -email');
  if(!user) return res.status(500).send('Server Error Occured')
  if(user.length === 0) return res.status(200).send('No data exist.')
  res.send(user);
}

module.exports ={
  userInfoByUserName,
  allUserProfile
}
