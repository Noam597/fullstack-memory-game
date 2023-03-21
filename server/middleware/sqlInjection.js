module.exports ={

    sqlInjectionDetector:(req,res,next)=>{
        const formValues = req.body; 
      
         let unclean = false
      
        for (const [key,value] of Object.entries(formValues)) {
      
            let sql_characters =/((\w|\d|\s)+)?[;='"]((\w|\d|\s)+)?/gi
      
           if(sql_characters.test(value)){ 
                 unclean = true
          //  return console.log('injection attempted',value)
           } 
      
           let sql_comment =/((\w|\d|\s)+)?--|#((\w|\d|\s)+)? /gi
             if(sql_comment.test(value)){ 
              unclean = true
            // return console.log('injection attempted',value)
           }
      
            let sql_union = /((\w|\d)+)?(\s([\n]|'|")?)union([(\s)]+\w)([\n])?/gi
           if(sql_union.test(value)){ 
            unclean = true
            // return console.log('injection attempted',value)
            }
      
          
      }  
      if(unclean == true){
               return res.status(403).json({
                message:"SQL Injection Detected"
              })
            }else{
              next()
            }
}
}
