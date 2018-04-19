const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const saltRounds = 10

let userSchema = new Schema ({
  username: String,
  email: String,
  password: String,
  role: {type: String, default: 'user'}
},{
  timestamps: true
})

let User = mongoose.model('User', userSchema)

userSchema.pre('save', function (next) {
  let plain = this.password
  let hash = bcrypt.hashSync(plain, saltRounds);
  
  this.password = hash

  next()
})

module.exports = User