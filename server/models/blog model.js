const mongoose = require('mongoose');
const Schema = mongoose.Schema

const blogSchema = Schema({
  title : {
    type: String,
    default: 'Untitled'
  },
  text: {
    type: String,
    default: 'None'
  }
},{
  timestamps: true
})

module.exports = mongoose.model('Blog', blogSchema)
