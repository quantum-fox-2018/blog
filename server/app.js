const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const port = process.env.PORT || 3000

const postRoute = require('./routers/posts')
const userRoute = require('./routers/users')

mongoose.connect(`mongodb://localhost/blog`)
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
  console.log('Connected to database...')
})

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(morgan('dev'))

app.use('/api/post', postRoute)
app.use('/api/user', userRoute)

app.listen(port, function() {
  console.log('Listening on port', port)
})

module.exports = app