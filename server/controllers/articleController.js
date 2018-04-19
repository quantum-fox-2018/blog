const Article = require('../models/articles')
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET

module.exports = {
  addArticle: function (req, res) {
    let decoded = jwt.verify(req.headers.token, secret)
    console.log('decode==', decoded)
    let input= {
      title: req.body.title,
      content: req.body.content,
      image: req.file.cloudStoragePublicUrl,
      author: decoded.id
    }
    Article.create(input, (err, newArticle) => {
      if(err) {
        res.status(400).json({
          message: 'error',
          err
        })
      }else{
        res.status(201).json({
          message: 'success adding new article!',
          newArticle
        })
      }
    })
  },
  showArticles: function (req, res) {
    Article.find()
    .sort({createdAt:'desc'})
    .populate('author')
    .exec()
    .then(listArticle => {
      res.status(200).json({
        message: 'success get all list',
        listArticle
      })
    }).catch(error => {
      res.status(400).json({
        message: 'error',
        error
      })
    })
  },
  updateArticle: function (req, res) {
    let id = {_id:req.params.id}
    let input = {
      title: req.body.title,
      content: req.body.content
    }
    console.log('input===',input)
    Article.findOneAndUpdate(id,input, (error) => {
      if(error) {
        res.status(400).json({
          message: 'error',
          error
        })
      }else{
        res.status(200).json({
          message: 'success edit an article!',
        })
      }
    })
  },
  removeArticle: function (req, res) {
    let id = {_id:req.params.id}
    console.log('remove id===', id)
    Article.findByIdAndRemove(id, (error, deletedArticle) => {
      if(error) {
        res.status(400).json({
          message: 'error',
          error
        })
      }else{
        res.status(200).json({
          message: 'success remove an article!',
          deletedArticle
        })
      }
    })
  }
}