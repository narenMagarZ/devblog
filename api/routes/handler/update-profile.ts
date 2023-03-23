
import {
     Request,
     Response
} from 'express'
import joi,{ValidationError} from 'joi'
import {Article} from '../../db/schemas'

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
     // const {
     //      id
     // } = req.user as {id:string}
     try{
          
          const bodySchema = joi.object<profile>({
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
               .required(),
               websiteUrl:joi.string().default('').required(),
               location:joi.string().default('').required(),
               bio:joi.string().default('').required(),
               currentlyHackingOn:joi.string().default('').required(),
               skills:joi.string().default('').required(),
               work:joi.string().default('').required(),
               picture:joi.string().default('').required(),
               availableFor:joi.string().default('').required(),
               education:joi.string().default('').required(),
               currentlyLearning:joi.string().default('').required()
          })
               const value = await bodySchema.validateAsync(req.body)
               console.log(value)
               const id  = '34'
               // await BlogPost.findByIdAndUpdate(id,req.body)
               return res.status(200).json({
                    msg:'profile updated'
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