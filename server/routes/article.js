const express = require('express')
const router = express.Router()

const articleController = require('../controllers/article')
const uploadMidleware = require('../middlewares/upload')
const token = require('../middlewares/token')

router.get('/', articleController.readArticles)
router.get('/:id', articleController.readArticle)
router.post('/', token.verify, uploadMidleware.multer.single('image'), uploadMidleware.upload, articleController.createArticle)
router.put('/:id', token.verify, uploadMidleware.multer.single('image'), uploadMidleware.upload, articleController.updateArticle)
router.delete('/:id', token.verify, articleController.deleteArticle)

module.exports = router
