const mongoose = require('mongoose');
const Schema = mongoose.Schema

const blogSchema = new Schema({
  title : {
    type: String,
    default: 'Untitled'
  },
  description: {
    type: String,
    default: 'No Description'
  },
  text: {
    type: String,
    default: 'None'
  },
  image: {
    type: String,
    default: 'http://www.reflectinglife.org/assets/images/noimg.jpg'
  }
},{
  timestamps: true
})

module.exports = mongoose.model('Blog', blogSchema)