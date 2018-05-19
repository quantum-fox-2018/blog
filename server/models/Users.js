const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Userschema = new Schema({
  username: String,
  email: String,
  password: String
})

const User = mongoose.model('User',Userschema)

module.exports = User;
