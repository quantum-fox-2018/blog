const Post = require('../models/Post')

module.exports = {
  findAll: function (req, res) {
    Post.find()
    .then(response => {
      res.status(200).send({
        message: 'Show all Post',
        data: response
      })
    })
    .catch(error => {
      res.status(400).send({
        message: 'No result',
        error: error.message
      })
    })
  },

  add: function (req, res) {
    let newPost = Post ({
      post_title: req.body.post_title,
      post_content: req.body.post_content
    })

    newPost.save()
    .then(response => {
      res.status(201).send({
        message: 'Post new article success',
        data: response
      })
    })
    .catch(error => {
      res.status(400).send({
        message: 'Post new article failed',
        error: error.message
      })
    })
  },

  update: function (req, res) {
    Post.findByIdAndUpdate({
      _id: req.params.id
    }, {
      post_title: req.body.post_title,
      post_content: req.body.post_content
    })
    .then(response => {
      res.status(200).send({
        message: 'Update article success',
        data: response
      })
    })
    .catch(error => {
      res.status(400).send({
        message: 'Update article failed',
        error: error.message
      })
    })

  },

  uploadImage: function (req, res) {
    res.status(201).send({
      message: 'Upload image success',
      link: req.file.cloudStoragePublicUrl
    })
  },

  remove: function (req, res) {
    Post.findByIdAndRemove({
      _id: req.params.id
    })
    .then(response => {
      res.status(200).send({
        message: 'Delete article success',
        data: response
      })
    })
    .catch(error => {
      res.status(400).send({
        message: 'Delete article failed',
        error: error.message
      })
    })
  }
}