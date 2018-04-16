const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
require('dotenv').config()

mongoose.connect('mongodb://localhost:27017/bloggy', (err => {
  if(err){
    console.log('failed connect')
  } else {
    console.log('successfully connect to database')
  }
}))

const users = require('./routes/users')
const articles = require('./routes/articles')

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.use('/users', users)
app.use('/articles', articles)

app.listen(3000, console.log('Aye aye, Captain!'))

module.exports = app