var express = require('express');
var router = express.Router();
const {signUp, signIn} = require('../controllers/userController')
/* GET users listing. */
router.post('/signup', signUp)
router.post('/signin', signIn)

module.exports = router;
