const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  email: {
    type: String,
    required: [true,'email must be filled'],
    unique: [true,'email is already existed'],
  },
  password: String,
  role: String,
})

module.exports = mongoose.model('User', userSchema)