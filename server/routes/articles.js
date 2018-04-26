const express = require('express')
const router = express.Router()
const {getAll, add, edit, del} = require('../controllers/articles')

router.get('/', getAll)
router.post('/', add)
router.put('/:_id', edit)
router.delete('/:_id', del)

module.exports = router