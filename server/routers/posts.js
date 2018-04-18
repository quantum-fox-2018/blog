const router = require('express').Router()
const { findAll, add, update, remove } = require('../controllers/posts_controller')
const { adminAuth } = require('../middlewares/auth')

router.get('/show', findAll)
      .post('/add', adminAuth, add)
      .put('/update/:id', adminAuth, update)
      .delete('/delete/:id', adminAuth,remove)

module.exports = router