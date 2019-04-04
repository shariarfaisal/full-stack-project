const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    trim: true,
    maxlength: 55
  },
  email: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  balance: Number,
  income: Number,
  expense: Number,
  transections: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: 'transection'
    }]
  }
});

const User = mongoose.model('user',userSchema);

module.exports = User;
