const Article = require('../models/article')

module.exports = {
  readArticles: function (req, res) {
    Article.find(function (err, articles) {
      if (err) return res.status(500).json({message: err.message})

      res.status(200).json({
        message: 'success to access article page',
        data: articles
      })
    }).populate('users')
  },

  readArticle: function (req, res) {
    let idArticle = req.params.id
    Article.findById(idArticle, function (err, article) {
      if (err) return res.status(500).json({message: err.message})

      res.status(200).json({
        message: 'success to access an article',
        data: article
      })
    })
  },

  createArticle: function (req, res) {
    let {title, content, username, image} = req.body
    let newArticle = new Article ({
      title, content, username, image: req.imageURL
    })

    newArticle.save(function (err) {
      if (err) return res.status(500).json({message: err.message})

      res.status(201).json({
        message: 'success to add an article',
        data: newArticle
      })
    })
  },

  updateArticle: function (req, res) {
    let idArticle = req.params.id
    let updateArticle;

    let {title, content, username, image} = req.body
    if (!image) {
      updateArticle = {
        title, content, username, image: req.imageURL
      }
    } else {
      updateArticle = {
        title, content, username
      }
    }

    Article.findByIdAndUpdate(idArticle, updateArticle, function (err) {
      if (err) return res.status(500).json({message: err.message})

      res.status(200).json({
        message: 'success to edit an article',
        data: updateArticle
      })
    })
  },

  deleteArticle: function (req, res) {
    let idArticle = req.params.id

    Article.findByIdAndRemove(idArticle, function (err) {
      if (err) return res.status(500).json({message: err.message})

      res.status(200).json({
        message: 'success to delete an article'
      })
    })
  }
}