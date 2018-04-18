const express = require('express')
const router = express.Router()
const artikelcontroller = require('../controllers/artikelcontroller')

router.post('/addartikel',artikelcontroller.addartikel)
router.get('/showartikels',artikelcontroller.showartikels)
router.delete('/deleteartikels/:id',artikelcontroller.deleteartikel)
router.put('/updateartikel/:id',artikelcontroller.updateartikel)

module.exports = router;
