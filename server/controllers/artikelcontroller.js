const User = require('../models/Users')
const Artikel = require('../models/Artikel')
var bcrypt = require('bcrypt');
const jwt  = require('jsonwebtoken');

const saltRounds = 10;

module.exports = {
  addartikel ( req,res ) {
    let decoded = jwt.verify(req.headers.token, process.env.SECRET);
    artikel = new Artikel();
    artikel.title = req.body.title
    artikel.content = req.body.content
    artikel.userid = decoded.id
    artikel.save().then( data => {
      res.status(200).json({
        message: 'add artikel succes',
        data
      })
    })
  },
  showartikels ( req, res ) {
    Artikel.find().sort( { createdAt: -1 }).then(data => {
      res.status(200).json({
        message: 'show artikel succes',
        data
      })
    })
  },
  deleteartikel ( req, res ) {
    Artikel.deleteOne({_id:req.params.id}).then(data => {
      res.status(200).json({
        message: 'delete artikel success',
        data
      })
    })
  },
  updateartikel ( req, res ) {
    Artikel.updateOne({_id:req.params.id},{$set:{title:req.body.title,content:req.body.content}}).then(data => {
      res.status(200).json({
        message: 'update artikel succes',
        data
      })
    })
  }
}
