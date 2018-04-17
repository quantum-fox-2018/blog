const mongoose = require('mongoose')
const Schema = mongoose.Schema

let postSchema = new Schema ({
  title: String,
  content: String
},{
  timestamps: true
})

let post = mongoose.model('post', postSchema)

module.exports = post