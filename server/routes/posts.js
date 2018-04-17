const router = require('express').Router()
const {findAll, add, update, remove} = require('../controllers/post.controller')

router
    .get('/', findAll)
    .post('/', add)
    .put('/:id', update)
    .delete('/:id', remove)

module.exports = router