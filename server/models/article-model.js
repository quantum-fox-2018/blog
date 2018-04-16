const mongoose = require('mongoose')
const Schema = mongoose.Schema

const articleSchema = new Schema({
    title: String,
    article_content: String,
    userId: String

}, {
    timestamps: true
})

let Article = mongoose.model('Article', articleSchema)

module.exports = Article