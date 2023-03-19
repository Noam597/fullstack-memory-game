require("dotenv").config();
const bcrypt = require("bcrypt");
const {db} = require('../db')
const table = process.env.TABLE;
const passwordCheck =/^(?=.*[a-z])(?=.*[A-Z].*[A-Z])(?=.*[0-9].*[0-9])(?=.*[!@#$%&])[a-zA-Z0-9?!@#$%&]{8,}$/g
const emailCheck = /^([a-zA-Z0-9\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,3})?$/gi
module.exports = {
    
    getAllPlayers:(req,res)=>{  
       db.query(`SELECT id,name,email,coins,role,banned FROM ${table} WHERE role = 'player'`,(err,result)=>{
        if(err){
            throw err
        }else{
           return res.json(result) 
        }
            
    })   
},
getOnePlayer: (req,res)=>{  
    const id = req.params.id
    db.query(`SELECT id,name,email,coins,role,banned FROM ${table} WHERE id = ?`,id,(err,result)=>{
    if(err){
        throw err
    }else{
       return res.json(result) 
    }
        
}) 
},
updatePlayerCoins:(req,res)=>{
    const {id ,coins} =req.body;
    db.query(`SELECT coins FROM ${table} WHERE id = ${id}`,(err,result)=>{
        if(err){
           return res.sendStatus(404)
        }else{
            console.log(result[0].coins)
            const bank = result[0].coins;
            db.query(`UPDATE new_table SET coins= ${bank} + ${coins}  WHERE id=${id}`,(addError,addCoins)=>{
                if(addError){
                    res.sendStatus(401)
                }else{
                    res.json({
                        sent:`Player with ID: ${id} has ${parseInt(bank)  + parseInt(coins)} on his account`
                    })
                }
            } )
        }
    })
},


banPlayer:(req,res)=>{
    const id = req.params.id;
    db.query(`SELECT role,banned FROM ${table} WHERE id = ${id} `,(err,ban)=>{
        if(err){
          return  console.log(err)
        }
        if(ban[0].role !== "player"){
          return res.sendStatus(403)
        }
     let banned = ban[0].banned
    db.query(`UPDATE ${table}  SET banned=${!banned} WHERE id =${id}`,(error,response)=>{
        if(error){
            console.log(error)
        }else{
            res.json({
                message:`player with  ${id} has been banned/unbanned`
            })
        }
    })  
  })
},
addPlayer:(req,res)=>{
    const { name, email, password } = req.body;
    if(!emailCheck.test(email)){
      return res.status(401).json({
        message:"Email must contain @ sign and domain name"
      })
    }   if(!passwordCheck.test(password)){
      return res.status(401).json({
        message:`Password must contain at least two uppercase
        letters and two numbers and one special character`
      })
    }
    db.query(`SELECT * FROM ${table} WHERE email=?`, email, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        if (result.length > 0) {
          res.send({
            message: "Email/UserName exists",
          });
        } else {
          bcrypt.hash(password, 10, (passwordError, hash) => {
            if (passwordError) {
              console.log(passwordError);
            } else {
              let addNewUser = `INSERT INTO ${table}(name,email,password,coins,verified,role,banned) VALUE(?,?,?,30,true,'player',false)`;
              db.query(addNewUser, [name, email, hash], (error, response) => {
                if (error) { 
                  console.log(error);
                } else { 
                  db.query(`INSERT INTO banned_players(playerEmail,banned) VALUE('${email}',false)`,(banErr,banRes)=>{
                   if(banErr) {console.log(banErr) }
                  }
                  )
                  res.send({
                    response: `${name} has been added`,
                  });
                }
              }); 
            }
          });
        }
      }
    });

},
removePlayer:(req,res)=>{
    const id = req.params.id;
    db.query(`DELETE FROM ${table} WHERE id = ${id}`,(err,result)=>{
        if(err){
            console.log(err)
        }else{
           return res.json(`player with ${id} has been removed`) 
        }
            
    }) 
},

}
