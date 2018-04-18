const mongoose = require('mongoose')
const Schema = mongoose.Schema

let postSchema = new Schema ({
  post_title: String,
  post_content: String
},{
  timestamps: true
})

let Post = mongoose.model('Post', postSchema)

module.exports = Post