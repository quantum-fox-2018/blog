const router = require('express').Router()
const articleController = require('../controllers/article-controller')

router.post('/create' , articleController.create)
router.get('/find', articleController.findAll)

module.exports = router