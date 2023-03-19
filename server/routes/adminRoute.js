const express = require('express')
const { tokenAuthCheck } = require('../middleware/jwtAuthCheck')
const { getAllPlayers, getOnePlayer, removePlayer, banPlayer, updatePlayerCoins, addPlayer } = require('../controller/admin')
const { recieveData } = require('../middleware/recieveData')

const adminRouter = express.Router()


adminRouter.get('/',getAllPlayers)
adminRouter.get('/:id',getOnePlayer)

adminRouter.post('/banned/:id',tokenAuthCheck,banPlayer)
adminRouter.post('/addplayer',recieveData,tokenAuthCheck,addPlayer)
adminRouter.post('/removeplayer/:id',tokenAuthCheck,removePlayer)
adminRouter.post('/addcoins',tokenAuthCheck,updatePlayerCoins)

module.exports = adminRouter