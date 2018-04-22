const userSchema = require('../models/user.model')
const bcrypt = require('bcrypt')
const salt = bcrypt.genSaltSync(10)
const jwt = require('jsonwebtoken')

class User {
  static read(req,res){
    userSchema.find()
    .then(users => {
      res.status(200).json({
        message:'list of users:',
        users
      })
    })
    .catch(err => {
      res.status(500).json({
        message:'something went wrong',
        err
      })
    })
  }
  
  static signup(req,res){
    let password = bcrypt.hashSync(req.body.password,salt)
    let obj = {
      email:req.body.email,
      password: password,
      role: 'user'
    }
    userSchema.create(obj)
    .then(data => {
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

  static createAdmin(req,res){
    let password = bcrypt.hashSync(req.body.password,salt)
    let obj = {
      email:req.body.email,
      password: password,
      role: 'admin'
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
  
  static signin(req,res){
    let password = req.body.password
    let target = {
      email:req.body.email
    }
    userSchema.findOne(target)
    .then(user=>{
      if(user){
        let clarify = bcrypt.compareSync(password,user.password)
        if(clarify){
          let payload = {
            _id:user._id,
            name:user.username,
            role:user.role
          }
          jwt.sign(payload,'secret key',(err,token)=>{
            if(err){
              res.status(500).json({
                message:'something went wrong',
                err
              })
            } else {
              res.status(200).json({
                message:'berhasil signin',
                token:token,
                id:payload._id,
                role:payload.role,
                username:payload.name
              })
            }
          })
        } else {
          res.status(403).json({
            message:'your password is wrong'
          })
        }
      } else {
        res.status(500).json({
          message:'user is not found'
        })
      }
    })
  }
}

module.exports = User