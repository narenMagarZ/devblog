import {
     Request,
     Response,
     NextFunction
} from 'express'
import passport from 'passport'

const authenticate = (req:Request,res:Response,next:NextFunction)=>{
     passport.authenticate('jwt',{
          session:false
     },(err:Error,user:any)=>{
          if(err){
               return res.status(401).json({
                    message:'Unauthorized'
               })
          }
          req.user = user
          next()
     })(req,res,next)
}
export default authenticate