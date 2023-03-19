const express = require('express')

const signUpRouter = express.Router()
const { register,login,subscribeToNewsletter, verifyPlayer } = require('../controller/signIn')
const { recieveRegisterData, recieveData } = require('../middleware/recieveData')
const { sqlInjectionDetector } = require('../middleware/sqlInjection')


signUpRouter.post("/login",recieveData,sqlInjectionDetector, login)

signUpRouter.post("/signup",recieveData,register)

signUpRouter.post("/subscribe",recieveData,subscribeToNewsletter)

signUpRouter.get("/verify/:id",verifyPlayer)

module.exports = signUpRouter 