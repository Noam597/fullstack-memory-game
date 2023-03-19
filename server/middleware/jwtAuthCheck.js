require('dotenv').config()
const jwt = require('jsonwebtoken')


module.exports ={

    createToken:(id)=>{
        const accessToken = jwt.sign({id:id},process.env.SECRET_TOKEN)

        return accessToken
    },


    tokenAuthCheck:(req,res,next)=>{
        const token = req.body.token

        if(token == null){ return res.sendStatus(401)}
            jwt.verify(token ,process.env.SECRET_TOKEN,(err,user)=>{
        if(err){
            return res.sendStatus(403)
        }
        next()
    })
    }
}
// module.exports ={
//     tokenAuthCheck:(req,res,next)=>{
//         const authHeader = req.headers['authorization']

//         const token = authHeader && authHeader.split(' ')[1]
// if(token == null){
//     return res.sendStatus(401)
// }

//     jwt.verify(token ,process.env.SECRET_TOKEN,(err,user)=>{
//         if(err){
//             return res.status(403)
//         }
//         req.id = id
//         next()
//     })
//         console.log(token)

//     }
// }