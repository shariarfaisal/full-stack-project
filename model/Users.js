const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema  = new Schema({
  name:{
    type: String,
    required: true,
    minlength: 3,
    maxlength: 55,
    trim: true
  },
  userName:{
    type: String,
    required: true,
    minlength: 3,
    maxlength: 20,
    trim: true
  },
  email: {
    type: String,
    required: true,
    minlength:5,
    maxlength: 200
  },
  password:{
    type: String,
    required: true,
    minlength: 6,
    maxlength: 99
  }
})

const Users = mongoose.model('users',usersSchema);
module.exports = Users;
