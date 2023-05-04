import jwt from 'jsonwebtoken';
import {Request, Response, NextFunction} from 'express'

interface IRequest extends Request{
     userData:any
}
function checkAuth(req:IRequest,res:Response,next:NextFunction){
     try{
          const authHeader = req.headers['authorization']
          if(!authHeader){
               return res.status(401).json({ message: 'Authentication failed'});
          }
          const token = authHeader.split(' ')[1]
          const decoded = jwt.verify(token,process.env.SECRET_KEY as string)
          req.userData = decoded
          next()
     }
     catch(err){
          return res.status(401).json({message:'Authentication failed'})
     }
}

export default checkAuth