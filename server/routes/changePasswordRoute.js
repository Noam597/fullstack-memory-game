const express = require('express')

const { getverification, verifyEmail, changePassword } = require('../controller/changepassword')
const { recieveData } = require('../middleware/recieveData')

const changPasswordRouter = express.Router()

changPasswordRouter.post('/',recieveData,getverification)
changPasswordRouter.post('/change',recieveData,verifyEmail)
changPasswordRouter.post('/changepassword',recieveData,changePassword)

module.exports = changPasswordRouter