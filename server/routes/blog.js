var express = require('express');
var router = express.Router();
const Blog = require('../controllers/blog.controller')

/* GET users listing. */
router.get('/', Blog.read)
router.post('/', Blog.create)
router.put('/', Blog.update)
router.delete('/', Blog.delete)

module.exports = router;