require("dotenv").config();

const { db } = require('../db')
module.exports = {
    getScores:(req,res)=>{
        db.query(`SELECT * FROM personal_score`,(err,result)=>{
            if(err){
                throw err
            }else{
                console.log(result)
            }
        })
    },
    getOneScore:(req,res)=>{
        const player_id = req.params.player_id;
        db.query(`SELECT * FROM personal_score WHERE player_id=${player_id}`,(err,result)=>{
            if(err){
                throw err
            }else{
                console.log(result)
                res.send(result) 
            }
        })

    },
  personalScore: (req, res) => {
    const { level, player_id, clicks,time } = req.body;
    let scoreSql = `SELECT player_id FROM personal_score`;
    db.query(scoreSql, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        if (result.length > 0) {
          let getScore = `SELECT ${level} FROM personal_score WHERE player_id=${player_id}`;
          db.query(getScore, (scoreErr, score) => {
             if(time){
                    let updateTime = `UPDATE personal_score SET best_time='${time}' WHERE player_id=${player_id}`;
                    db.query(updateTime,(timeError,newTime)=>{
                        if(timeError) throw timeError
                })
            if (scoreErr) {
              throw scoreErr;
            } else {
              if (score >= clicks) { 
                return;
              } else {
               
                }
                let updateScore = `UPDATE personal_score SET ${level}=${clicks} WHERE player_id=${player_id}`;
                db.query(
                  updateScore,
                  (updateErr, newScore) => {
                    if (updateErr) {
                      throw updateErr;
                    } else {
                      console.log(newScore);
                    }
                  }
                );
              }
            }
          });
        } else {
          db.query(
            `INSERT INTO personal_score(player_id,${level}) VALUES(${player_id},${clicks})`,
            (error, highScore) => {
              if (error) {
                throw error;
              }
            }
          );
        }
      }
    });
  },
};
