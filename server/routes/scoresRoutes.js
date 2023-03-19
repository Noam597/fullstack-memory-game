const express = require('express')
const { personalScore, getScores ,getOneScore} = require('../controller/scores')
const { tokenAuthCheck } = require('../middleware/jwtAuthCheck')
const scoresRoutes = express.Router()


scoresRoutes.get('/',getScores)
scoresRoutes.get('/:player_id',getOneScore)
scoresRoutes.post("/bestscore",tokenAuthCheck,personalScore)

 
module.exports = scoresRoutes