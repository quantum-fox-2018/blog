const express = require('express')
const router = express.Router()
const token = require('../middlewares/token')

const articleController = require('../controllers/article')

router.get('/', articleController.readArticles)
router.get('/:id', articleController.readArticle)
router.post('/', token.verify, articleController.createArticle)
router.put('/:id', token.verify, articleController.updateArticle)
router.delete('/:id', token.verify, articleController.deleteArticle)

module.exports = router
