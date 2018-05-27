const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const port = process.env.PORT || 3000
const db_user = process.env.DB_USER
const db_pass = process.env.DB_PASS

const postRoute = require('./routers/posts')
const userRoute = require('./routers/users')

// mongoose.connect(`mongodb://localhost/blog`)
mongoose.connect(`mongodb://${db_user}:${db_pass}@ds247759.mlab.com:47759/barestu-blog`)
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