
import {
     Request,
     Response
} from 'express'
import joi,{ValidationError} from 'joi'
import { User } from '../../db/schemas'

interface profile {
     name:string
     userName:string
     email:string
     websiteUrl:string
     location:string
     bio:string
     currentlyLearning:string
     skills:string
     currentlyHackingOn:string
     availableFor:string
     work:string
     education:string
     brandColor:string
     picture:string
}
export default async function updateProfile(
     req:Request<{},{},profile>,
     res:Response
){
     let me : User = req.user as User
     let userName = me['userName']
     if(!userName){
          return res.status(401).json({
               error:'Authentication required'
          })
     }
     console.log(req.body,'req.body')
     try{
          const bodySchema = joi.object<{
               name:string
               userName:string
               email:string
               brandColor:string
          }>({
               name:joi.string()
               .min(3)
               .required(),
               userName:joi.string()
               .min(3)
               .max(20)
               .regex(/^[\dA-z_.-]+$/)
               .message('invalid {#label}')
               .required(),
               email:joi
               .string()
               .email()
               .required(),
               brandColor:joi
               .string()
               .regex(/(?=.*#)^[#A-z\d]{7}$/)
               .message('invalid {#label}')
               .required()
          })
               const value = await bodySchema.validateAsync({
                    name:req.body.name,
                    userName:req.body.userName,
                    email:req.body.email,
                    brandColor:req.body.brandColor
               })
               console.log(value)
               const user = await User.findByIdAndUpdate(me.id,{
                    ...req.body
               })
               if(user){
                    return res.status(200).json({
                         msg:'profile updated'
                    })
               }else return res.status(404).json({
                    error:'user not found'
               })
     }
     catch(err){
          console.error(err)
          const status = err instanceof ValidationError ? 400 : 500
          return res.status(status).json({
               msg:err.message
          })
     }
}