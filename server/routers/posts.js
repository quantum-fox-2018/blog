const router = require('express').Router()
const { findAll, findOne, add, uploadImage, update, remove } = require('../controllers/posts_controller')
const { multer, sendUploadToGCS } = require('../helpers/upload')
const { adminAuth } = require('../middlewares/auth')

router.get('/show', findAll)
      .get('/show/:id', findOne)
      .post('/add', adminAuth, add)
      .post('/upload-image', adminAuth, multer.single('image_file'), sendUploadToGCS, uploadImage)
      .put('/update/:id', adminAuth, update)
      .delete('/delete/:id', adminAuth, remove)

module.exports = router