const express = require('express')
const { getPrices, updatePrices } = require('../controller/prices')
const priceRoutes = express.Router()

const { tokenAuthCheck } = require('../middleware/jwtAuthCheck')
const { recieveData } = require('../middleware/recieveData')


priceRoutes.get("/",getPrices)
priceRoutes.post('/updateprices',tokenAuthCheck,recieveData,updatePrices)



module.exports = priceRoutes