require("dotenv").config();
const bcrypt = require("bcrypt"); 
const { sendeMail } = require("../models/nodemailer");
const {db} = require('../db')
const table = process.env.TABLE;

module.exports ={
    getverification:(req,res)=>{
        const {email} = req.body
        db.query(`SELECT * FROM verify_player WHERE email=?`,email,(err,result)=>{
            if(err){
                return res.sendStatus(404)
            }
            if(result.length > 0){
                return res.json(result)
            }
        })
    },
    verifyEmail:(req,res)=>{
        const {email,answer1,answer2} = req.body
       db.query(`SELECT * FROM verify_player WHERE email=?`,email,(err,result)=>{
        if(err){
            return res.sendStatus(401)
        }else{
            const a1= result[0].answer1
            const a2= result[0].answer2
            if(answer1 === a1 && answer2 === a2){
                return res.json({verified:"correct you may proceed"})
            }
        }
       }) 
    },
    changePassword:async(req,res)=>{
        const {email,password1,password2} = req.body
        if(password1 === password2){
            bcrypt.hash(password1,10,(error,hash)=>{
                if(error){
                   return res.sendStatus(401)
                }else{
                    db.query(`UPDATE ${table} SET password =? WHERE email='${email}'`,
            [hash,email],(errHash,success)=>{
                if(errHash){
                    return res.sendStatus(401)
                }else{
                    let changePasswordEmail = {to:email,subject:"Password Change",html:`<h1>Your Password Has Been Changed Succesfully</h1>`}
                    sendeMail(changePasswordEmail)
                    console.log(success)
                    return res.json(success)
                }
            })
                }
            })
            
        }else{
           return res.json({error:"passwords dont match"})
        }
        
    }
}