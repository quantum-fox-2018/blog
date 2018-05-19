const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Artikelschema = new Schema({
  title: String,
  content: String,
  userid: { type: Schema.Types.ObjectId, ref: 'User' }
},{timestamps:true})

const Artikel = mongoose.model('Artikel',Artikelschema)

module.exports = Artikel;
