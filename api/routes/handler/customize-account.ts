
import{
     Request,
     Response
} from 'express'
import joi,{ValidationError} from 'joi'
import { User } from '../../db/schemas'


interface CustomizeAccount {
     theme:'dark'|'light'
     baseReadingFont:Font
     siteNavbar:'Fixed to window'|'Static top of page'
     editorVersion:'Rich + markdown'|'Basic markdown'
     experienceLevel:'Novice'|'Beginner'|'Mid-level'|'Advanced'|'Expert'
}
type Font = 'Helvetica'|'monospace'|'comic sans'|'open dyslexic'|'sans serif'|'serif'


async function customizeAccount(
     req:Request<{},{},CustomizeAccount>,
     res:Response
){
     let me : User = req.user as User
     let userName = me['userName']
     if(!userName){
          return res.status(401).json({
               error:'Authentication required'
          })
     }
     const schema = joi.object<CustomizeAccount>({
          theme:joi.string()
          .valid('light','dark')
          .default('light')
          .required(),
          baseReadingFont:joi.string()
          .valid('monospace','comic sans','open dyslexic','sans serif','serif','default')
          .default('default')
          .required(),
          siteNavbar:joi.string()
          .valid('Static top of page','Fixed to window')
          .default('Fixed to window')
          .required(),
          editorVersion:joi.string()
          .valid('Rich + markdown','Basic markdown')
          .default('Rich + markdown')
          .required(),
          experienceLevel:joi.string()
          .valid('Novice','Beginner','Mid-level','Advanced','Expert')
          .default('Novice')
          .required()
     })
     try{
          const value = await schema.validateAsync(req.body)
          const user = await User.findByIdAndUpdate(me.id,{
               ...value
          })
          if(user){
               return res.status(200).json({
                    message:'updated'
               })
          }else return res.status(404).json({
               error:'user not found'
          })
     }
     catch(err){
          console.error(err)
          const status = err instanceof ValidationError?400:500
          return res.status(status).
          json({
               msg:err.message
          })
     }
}

export default customizeAccount