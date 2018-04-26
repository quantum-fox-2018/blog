const mongoose = require('mongoose')

const Schema = mongoose.Schema

const articleSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  title: String,
  text: String
})

const Article = mongoose.model('Article', articleSchema)

module.exports = Article