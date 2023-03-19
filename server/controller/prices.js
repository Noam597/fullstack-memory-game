require("dotenv").config();
const {db} = require('../db')
const table = process.env.TABLE;

module.exports ={
    getPrices:(req,res)=>{
        db.query(`SELECT * FROM game_prices`,(err,result)=>{
            if(err){
                console.log(err)
                
            }else{
                console.log(result)
                res.json(result)
            }
        })
    },
    updatePrices:(req,res)=>{
       const {easy,moderate,hard,time_attack} = req.body;
       if(easy <= 0
        ||moderate <= 0
        ||hard <= 0
        ||time_attack <= 0){
            return res.json({message:"price must be higher then 0"})
        } else{
            let sql = `UPDATE game_prices SET easy=${easy},moderate=${moderate},hard=${hard},time_attack=${time_attack} WHERE id=1`
            db.query(sql,(err,response)=>{
                if(err){
                    return res.sendStatus(404)
                }else{
                    res.json({
                        response:"memory game prices have been updated"
                    })
                }
            })
        }
    }
}