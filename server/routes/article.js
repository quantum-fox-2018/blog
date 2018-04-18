const express = require('express')
const router = express.Router()

const articleController = require('../controllers/article')

router.get('/', articleController.readArticles)
router.get('/:id', articleController.readArticle)
router.post('/', articleController.createArticle)
router.put('/:id', articleController.updateArticle)
router.delete('/:id', articleController.deleteArticle)

module.exports = router
