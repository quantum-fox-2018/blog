const router = require('express').Router()
const {findAll, findById, add, addComment, update,updateNoImage, remove} = require('../controllers/post.controller')
const multer = require('multer')
const uploadMidleware = require('../middleware/upload')
const {auth} = require('../middleware/auth')

const uploaderMem = multer({
  storage: multer.memoryStorage(),
  limits: {
      fileSize: 10 * 1024 * 1024
  }
})

router
    .get('/', findAll)
    .get('/:id', findById)
    .post('/', uploaderMem.single('image'),uploadMidleware.upload, add)
    .post('/addcomment', auth, addComment)
    .put('/', uploaderMem.single('image'),uploadMidleware.upload, update)
    .put('/noImage', updateNoImage)
    .delete('/:id', remove)

module.exports = router