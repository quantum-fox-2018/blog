const Post = require('../models/post.model')

module.exports = {
  findAll: (req, res) => {
    Post
    .find()
    .populate('comments.user')
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
  findById: (req, res) => {
    const {id} = req.params
    Post.find({
      _id: id
    })
    .then(response => {
      res.status(200).send({
        message: 'Query one post success',
        data: response
      })
    })
    .catch(err => {
      res.status(400).send({
        message: 'Query one post failed',
        err: err.message
      })
    })
  },
  add: (req, res) => {
    const {title, content, category} = req.body

    let newPost = Post ({
      title, content, image: req.imageURL, category
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
  addComment: (req, res) => {
    let userid = req.headers.decoded.id
    const {id, comment} = req.body
    const newComment = {
      user: userid,
      comment
    }

    Post.findByIdAndUpdate({
      _id: id
    }, {
      $push: {
        comments: newComment
      }
    })
    .then(response => {
      res.status(200).send({
        message: 'Add comment to post success',
        data: response
      })
    })
    .catch(err => {
      res.status(400).send({
        message: 'Add comment to post failed',
        err: err.message
      })
    })
  },
  update: (req, res) => {
    const {id} = req.params
    const {title, content, category} = req.body

    Post.findByIdAndUpdate({
      _id: id
    }, {
      title, content, image: req.imageURL, category
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