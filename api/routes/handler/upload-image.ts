import {  
     Request,
     Response
} from 'express'
import { logger } from '../../utils/logger'

export default function uploadImage(
     req:Request,
     res:Response
){
     try{
          console.log(req.file,req.files)
          /**
           * todo first check req.files and take out the generated url for that image and send that link to the user 
           */
          return res.status(201).json({
               message:'ok'
          })

     }
     catch(err){
          console.error(err)
          return res.status(500).json({
               error:'internal server error'
          })
     }
}