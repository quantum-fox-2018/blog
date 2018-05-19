var express = require('express');
var router = express.Router();
const Blog = require('../controllers/blog.controller')
const images = require('../helpers/images')

/* GET users listing. */
router.get('/', Blog.read)
router.get('/:id', Blog.readOne)
router.post('/',images.multer.single('image'),images.sendUploadToGCS,Blog.create)
router.put('/:id',images.multer.single('image'),images.sendUploadToGCS,Blog.update)
router.delete('/:id', Blog.delete)


module.exports = router;