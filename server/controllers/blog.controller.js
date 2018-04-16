const blogSchema = require('../models/blog.model')

class Blog {
  static create(req,res){
    let obj = {
      title: req.body.title,
      text: req.body.text
    }
    blogSchema.create(obj)
    .then(user => {
      res.status(200).json({
        message: 'create blog successfull',
        data
      })
    })
    .catch(err => {
      res.status(500).json({
        message:'something wentrong',
        err
      })
    })
  }

  static read(req,res){
    blogSchema.find()
    .then(blog => {
      res.status(200).json({
        message:'list of blog:',
        data
      })
    })
  }

  static delete(req,res) {
    let target = {
      _id:req.params.id
    }
    blogSchema.findOneAndRemove(target)
    .then(blog => {
      res.status(200).json({
        message:'delete blog successfully',
        blog
      })
    })
    .catch(err => {
      res.status(500).json({
        message:'something went wrong',
        err
      })
    })
  }

  static update(req,res){
    let target = {
      _id:req.params.id
    }
    blogSchema.find(target)
    .then(data => {
      data.title = req.body.title || data.title,
      data.text = req.body.text || data.text
      data.save()
      .then(savedData=>{
        res.status(200).json({
          message:'update success',
          savedData
        })
      })
      .catch(err=>{
        res.status(500).json({
          message:'update failed',
          err
        })
      })
    })
    .catch(err=>{
      res.status(500).json({
        message:'data is not found',
        err
      })
    })
  }
}
module.exports = Blog