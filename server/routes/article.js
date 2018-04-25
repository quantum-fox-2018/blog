const router = require('express').Router()
const articleController = require('../controllers/article-controller')

router.post('/create' , articleController.create)
router.get('/find', articleController.findAll)
router.get('/find/:id', articleController.findByUser)
router.delete('/delete/:id', articleController.delete)
router.put('/update/:id', articleController.update)

module.exports = router