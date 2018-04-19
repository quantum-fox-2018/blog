const mongoose = require('mongoose')
const timestamps = require('goodeggs-mongoose-timestamps')

const Schema = mongoose.Schema;

const articleSchema = new Schema ({
  title: {
    type: String
  },
  content: {
    type: String
  },
  username: {
    type: String
  }
})
//plugin
articleSchema.plugin(timestamps)

let ArticleSchema = mongoose.model('Article', articleSchema)

module.exports = ArticleSchema
