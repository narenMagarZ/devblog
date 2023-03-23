import {
     Request,
     Response
} from 'express'


function twitterEnter(req:Request,res:Response){
     try{
          
     }
     catch(err){
          console.error(err)
          return res.status(500).json({
               error:'internal server error'
          })
     }
}

export default twitterEnter