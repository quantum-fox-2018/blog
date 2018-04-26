const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const artilceSchema = new Schema({
  title: String,
  content: String,
  image: String,
  author:{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
},{
  timestamps: true
});

const Article = mongoose.model('Article', artilceSchema);

module.exports = Article
