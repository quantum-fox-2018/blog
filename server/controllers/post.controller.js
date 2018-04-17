const Post = require('../models/post.model')

module.exports = {
  findAll: (req, res) => {
    Post.find()
    .then(response => {
      res.status(200).send({
        message: 'Query all post success',
        data: response
      })
    })
    .catch(err => {
      res.status(400).send({
        message: 'Query all post failed',
        err: err.message
      })
    })
  },

  add: (req, res) => {
    const {title, content} = req.body

    let newPost = Post ({
      title, content
    })

    newPost.save()
    .then(response => {
      res.status(201).send({
        message: 'Add new post success',
        data: response
      })
    })
    .catch(err => {
      res.status(400).send({
        message: 'Add new post failed',
        err: err.message
      })
    })
  },

  update: (req, res) => {
    const {id} = req.params
    const {title, content} = req.body

    Post.findByIdAndUpdate({
      _id: id
    }, {
      title, content
    })
    .then(response => {
      res.status(200).send({
        message: 'Update post success',
        data: response
      })
    })
    .catch(err => {
      res.status(400).send({
        message: 'Update post failed',
        err: err.message
      })
    })
  },

  remove: (req, res) => {
    const {id} = req.params

    Post.findByIdAndRemove({
      _id: id
    })
    .then(response => {
      res.status(200).send({
        message: 'Delete post success',
        data: response
      })
    })
    .catch(err => {
      res.status(400).send({
        message: 'Delete post failed',
        err: err.message
      })
    })
  }
}