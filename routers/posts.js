const router = require('express').Router()
const { findAll, add, update, remove } = require('../controllers/posts_controller')

router.get('/find', findAll)
      .post('/add', add)
      .put('/update', update)
      .delete('/delete', remove)

module.exports = router