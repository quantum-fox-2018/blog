const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.status(200).json({
    message: 'success to homepage'
  })
});

router.use('/articles', require('./article'))
router.use('/users', require('./user'))

module.exports = router;
