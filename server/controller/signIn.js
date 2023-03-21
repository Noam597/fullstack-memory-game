require("dotenv").config();
const bcrypt = require("bcrypt");
const {createToken} = require('../middleware/jwtAuthCheck') 
const {db} = require('../db')
const table = process.env.TABLE;

const { sendeMail } = require("../models/nodemailer");

const passwordCheck =/^(?=.*[a-z])(?=.*[A-Z].*[A-Z])(?=.*[0-9].*[0-9])(?=.*[!@#$%&])[a-zA-Z0-9?!@#$%&]{8,}$/g
const emailCheck = /^([a-zA-Z0-9\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,3})?$/gi

module.exports = {
  register:async (req, res) => {
    const { name, email, password,question1,question2,answer1,answer2 } = req.body;
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
          res.json({
            message: "Email/UserName exists",
          });
        } else {
          bcrypt.hash(password, 10, (passwordError, hash) => {
            if (passwordError) {
              console.log(passwordError);
            } else {
              let addNewUser = `INSERT INTO ${table}(name,email,password,coins,verified,role,banned) VALUE(?,?,?,30,false,'player',false)`;
              db.query(addNewUser, [name, email, hash], (error, response) => {
                const id = response.insertId
                 console.log(id)
                if (error) { 
                  console.log(error);
                } else { 
                    db.query(`INSERT INTO verify_player(email,question1,question2,answer1,answer2) VALUE(?,?,?,?,?)`,
                    [email,question1,question2,answer1,answer2],
                    (vrError,verified)=>{
                      if(vrError){
                       return console.log(vrError)
                      }else{
                        console.log(verified)
                      }
                    })

                   let verificationEmail = {to:email,subject:"Verify Your Account",html:`<h1><a href="http://localhost:3001/members/verify/${id}">please click</a> to verify your account</h1> `}
                   sendeMail(verificationEmail)
                  res.json({
                    response: `welcome to the club ${name}`,
                  });
                 
                }
              }); 
            }
          });
        }
      }
    });

    console.log(name, email);
  },
  login: async(req, res) => {
    const { email, password } = req.body;

    db.query(`SELECT * FROM  ${table} WHERE email=?`, email, (err, result) => {
      if (err) {
        return res.json({ error: err });
      } else {
        if (result.length > 0) {
          if(!result[0].verified){
            return res.json({
              message:'Please Verify Your Email' 
            })
          }
          if(result[0].banned){
            return res.json({
              message:'Your account has been banned for misuse' 
            })
          }

          console.log(result);
          bcrypt.compare(password, result[0].password, (error, response) => {
            if (error) {
              return res.json({ error: error });
            } else {
              if (response) {
                let user = {} 
                const id = result[0].id;
                if(result[0].role === "coach"){
                   user = {
                    id:id,
                    name:result[0].name,
                    email:result[0].email,
                    coins:result[0].coins,
                    admin:result[0].role
                  }
                }else{
                    user = {
                  id:id,
                  name:result[0].name,
                  email:result[0].email,
                  coins:result[0].coins,
                  role:result[0].role
                }
                }
               
                const accessToken = createToken(id)
               return res.status(200).json({user:user,token:accessToken});
              }
            }
          });
        } else {
          res.json({
            message: "email/password Incorrect",
          });
        }
      }
    });
  },
 

  subscribeToNewsletter:(req,res)=>{

    const { name, email} = req.body;
  
    let sql =`SELECT * FROM newsletter_subscriptions WHERE email=?`
    db.query(sql,email,(err,result)=>{
      if(err){
       return console.log(err)
      }
    
        if(result.length > 0){
        return res.json({
          message:"You're already Subscribed"
        })
      }else{
        let sqlSubscribe = `INSERT INTO newsletter_subscriptions(name,email) VALUE(?,?)`
        db.query(sqlSubscribe,[name,email],(error,response)=>{
          if(error){
            console.log(error)
          }else{
            console.log(result)
            return res.json({
              response:"Thank You For subscribing"
            }) 
          }
        })
      }
    })
  },
  verifyPlayer:(req,res)=>{
    const id = req.params.id
    db.query(`UPDATE ${table} SET verified=true WHERE id = ${id}`,(err,verify)=>{
      if(err){
       return res.sendStatus(404)
      }else{
        res.sendFile(__dirname +'/public/verify.html' )
      }
    })
  }
};
