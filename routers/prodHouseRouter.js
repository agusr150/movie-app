const express = require('express')
const router = express.Router()

const ProdHouse = require('../controllers/prodHouseControl') 

router.use('/', ProdHouse.show)


module.exports = router