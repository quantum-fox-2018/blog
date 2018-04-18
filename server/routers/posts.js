const router = require('express').Router()
const { findAll, add, update, remove } = require('../controllers/posts_controller')

router.get('/show', findAll)
      .post('/add', add)
      .put('/update/:id', update)
      .delete('/delete/:id', remove)

module.exports = router