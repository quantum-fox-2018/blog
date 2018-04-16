const userSchema = require('../models/user.model')
const bcrypt = require('bcrypt')
const salt = bcrypt.genSaltSync(10)

class User {
  static read(req,res){
    userSchema.find()
    .then(users=>{
      res.status(200).json({
        message:'list of users:',
        users
      })
    })
    .catch(err =>{
      res.status(500).json({
        message:'something went wrong',
        err
      })
    })
  }
  
  static create(req,res){
    let password = bcrypt.hashSync(req.body.password,salt)
    let obj = {
      email:req.body.email,
      password: password
    }
    userSchema.create(obj)
    .then(data=>{
      res.status(200).json({
        message:'user created!',
        data
      })
    })
    .catch(err=>{
      res.status(500).json({
        message:'something went wrong',
        err
      })
    })
  }

  static update(req,res){
    let password = bcrypt.hashSync(req.body.password,salt)
    let target = {
      _id:req.params.id
    }
    userSchema.find(target)
    .then(data=>{
      data.email = req.body.email
      data.password = password
      data.save()
      .then(savedUser=>{
        res.status(200).json({
          message:'user updated',
          savedUser
        })
      })
      .catch(err=>{
        res.status(500).json({
          message:'failed to update user',
          err
        })
      })
    })
    .catch(err=>{
      res.status(500).json({
        message: 'cant find target user',
        err
      })
    })
  }

  static delete(req,res){
    let target = {
      _id:req.params.id
    }
    userSchema.findOneAndRemove(target)
    .then(data=>{
      res.status(200).json({
        message:'user deleted',
        data
      })
    })
    .catch(err=>{
      res.status(500).json({
        message:'fail to delete user data',
        err
      })
    })
  }
}

module.exports = User