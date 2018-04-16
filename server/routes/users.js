var express = require('express');
var router = express.Router();
const User = require('../controllers/user.controller')

/* GET users listing. */
router.get('/', User.read)
router.post('/', User.create)
router.put('/', User.update)
router.delete('/', User.delete)
module.exports = router;
