const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const secret = process.env.SECRET

module.exports = {
  signup: function (req, res) {
    let newUser = new User ({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role
    })

    newUser.save()
    .then(response => {
      res.status(201).send({
        message: 'Signup new user success',
        data: response
      })
    })
    .catch(error => {
      res.status(400).send({
        message: 'Signup new user failed',
        error: error
      })
    })
  },

  signin: function (req, res) {
    
    User.findOne({
      username: req.body.username
    })
    .then(user => {
      bcrypt.compare(req.body.password, user.password, (error, response) => {
        if (response) {
          let token = jwt.sign({
            username: user.username,
            email: user.email,
            role: user.role
          }, secret)
          
          res.status(200).send({
            message: 'Login success',
            token: token
          })
        } else {
          res.status(400).send({
            message: 'Login failed, wrong password',
            error: error
          })
        }
      })
    })
    .catch(error => {
      res.status(400).send({
        message: 'Login failed, wrong username',
        error: error.message
      })
    })
  }
}