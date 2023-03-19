require("dotenv").config();
const {db} = require('../db')

module.exports ={
    paymentLog:(req,res)=>{
        const id = req.params.id;
        const purchase = req.body.purchase;
        if(id == undefined) return
        let sql = `SELECT email,coins FROM new_table WHERE id=?`
        db.query(sql,id,(error,result)=>{
            if(error){
                console.log(error)
            }else{
                console.log(result)
                const coins = result[0].coins;
                db.query(`UPDATE new_table SET coins= ${coins} + ${purchase}  WHERE id=${id}`,
                [purchase,id],(err,response)=>{
                    if(err){
                        console.log(err)
                        return res.sendStatus(402)
                    }else{
                        res.json("thank you for your purchase")
                        
                        var sqlPaymentLog = `INSERT INTO payments (playerID,payment_amount,payment_date) VALUES(${id},${purchase},NOW())`;

                        db.query(sqlPaymentLog,[id,purchase],async (paymentError,paymentResult)=>{
                            if(paymentError){
                                console.log(paymentError)
                            }else{
                                console.log('success')
                            }
                        })
            }
        })}
        })
    
    },
   payToPlay:async(req,res)=>{
        const id = req.params.id;
        const {level} = req.body
        if(id == undefined) return
        let sqlPrice = `SELECT ${level} FROM game_prices`
                    db.query(sqlPrice,(err,result)=>{
                    const price = Object.values(result[0])

        let sql = `SELECT coins FROM new_table WHERE id=?`
        db.query(sql,id,(error,result)=>{
            if(error){
                console.log(error)
            }else{
                const coins = result[0].coins;
                if(coins <= 0){
                    return res.send({
                        message:'Please buy more coins'
                    })  
                }
                else if(coins < price){
                    return res.send({
                        message:'You dont Have enough coins to play'
                    }) 
                    }
                    else{
                    let subtract =`UPDATE new_table SET coins= ${coins}-${price}  WHERE id=?`
                    db.query(subtract,id,(err,response)=>{
                            if(err){
                           return console.log(err)
                            }else{
                            res.send(coins)
                            console.log(coins)
                            }              
                    })}
       }})})
    },
 
}