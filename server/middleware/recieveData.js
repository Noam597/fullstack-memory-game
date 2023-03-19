


module.exports = {
  
    recieveData:(req,res,next)=>{
        const formValues = req.body;
        const whiteSpaces = /^[\s]+$/
        const beforeAndAfterWhiteSpace = /(^\s|\s$)/g
        for (const [key,value] of Object.entries(formValues)) {
           
            if (!value.length) {
                return res.json({
                     message:"No Information sent"
                 }) 
            }
            if(whiteSpaces.test(value)||beforeAndAfterWhiteSpace.test(value)){

                   return res.json({
                    message:"No white space before or after information"
                }) 
               }
             
       }
       next()
           
        }  
         
        
    
} 