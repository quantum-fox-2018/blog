const Article = require('../models/articles')
const jwt = require('jsonwebtoken')

module.exports = {
  getAll (req, res) {
    Article.find()
    .populate('author')
    .exec()
    .then(article => {
      res.status(200).json({
        message: 'List all articles',
        article
      })
    })
  },
  add (req, res) {
    const decoded = jwt.verify(req.headers.token, process.env.SECRET)
    const article = new Article()
    article.author = decoded._id
    article.title = req.body.title
    article.text = req.body.text
    article.save()
    .then(data => {
      res.status(201).json({
        message: 'Added new article',
        data
      })
    })
    .catch(error => {
      res.status(400).json(error)
    })
  },
  edit (req, res) {
    Article.findOne({_id: req.params._id})
    .then(article => {
      if(article){
        Article.update({_id: req.params._id}, {$set: req.body}, {upsert: true})
        .exec()
        .then(data => {
          res.status(201).json({
            message: 'Update success',
            data
          })
        })
        .catch(error => {
          res.status(409).json(error)
        })
      }
    })
    .catch(error => {
      res.status(409).json(error)
    })
  },
  del (req, res) {
    Article.remove({_id: req.params._id})
    .then(() => {
      res.status(200).json('Article deleted')
    })
  }
}