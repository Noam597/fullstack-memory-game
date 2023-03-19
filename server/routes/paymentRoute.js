const express = require('express')
const paymentRouter = express.Router()
const { paymentLog, payToPlay } = require('../controller/payments')
const { tokenAuthCheck } = require('../middleware/jwtAuthCheck')


paymentRouter.post("/pay/:id",tokenAuthCheck,paymentLog)
paymentRouter.post("/paytoplay/:id",tokenAuthCheck,payToPlay)
// paymentRouter.post("/signup",)

module.exports = paymentRouter