const mongoose = require('mongoose')
const timestamps = require('goodeggs-mongoose-timestamps')
const uniqueValidator = require('mongoose-unique-validator')

const hash = require('../middlewares/hash')

const Schema = mongoose.Schema;

const userSchema = new Schema ({
  username: {
    type: String,
    unique: true,
    required: [true, 'Please insert your username']
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Please insert your email']
  },
  password: {
    type: String,
    minlength: [6, 'Password must contains min 6 char']
  }
})
//plugin
userSchema.plugin(timestamps)
userSchema.plugin(uniqueValidator, { message: '{PATH} has been used' })
//hook
userSchema.pre('save', function(next) {
  if(this.password) {
    this.password = hash.generate(this.password)
  }
  next()
})

let UserSchema = mongoose.model('User', userSchema)

module.exports = UserSchema