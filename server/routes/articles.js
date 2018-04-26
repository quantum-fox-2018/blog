var express = require('express');
var router = express.Router();
const multer = require('multer')
const {addArticle, showArticles, updateArticle, removeArticle} = require('../controllers/articleController')
const {sendUploadGCS} = require('../middlewares/uploadGCS')

const uploadFile = multer ({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024
  }
})

// router.post('/', addArticle)
router.post('/', uploadFile.single('image'),sendUploadGCS, addArticle)
router.get('/', showArticles)
router.put('/:id', updateArticle)
router.delete('/:id', removeArticle)

module.exports = router;
