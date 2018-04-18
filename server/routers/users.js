const router = require('express').Router()
const { signup, signin } = require('../controllers/users_controller')

router.post('/signup', signup)
      .post('/signin', signin)

module.exports = router