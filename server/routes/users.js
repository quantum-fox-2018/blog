var express = require('express');
var router = express.Router();
const usercontroller = require('../controllers/userscontroller')

router.post('/signup',usercontroller.signup)
router.post('/signin',usercontroller.signin)

module.exports = router;
