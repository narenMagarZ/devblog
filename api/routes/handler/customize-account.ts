
import{
     Request,
     Response
} from 'express'
import joi,{ValidationError} from 'joi'


interface CustomizeAccount {
     theme:'dark'|'light'
     font:Font
     navBarPos:'top'|'fixed'
     editorVersion:'advance'|'basic'
     yourExperience:1|2|3|4|5
}
type Font = 'Helvetica'|'monospace'|'comic sans'|'open dyslexic'|'sans serif'|'serif'


async function customizeAccount(
     req:Request<{},{},CustomizeAccount>,
     res:Response
){

     const schema = joi.object<CustomizeAccount>({
          theme:joi.string()
          .valid('light','dark')
          .default('light')
          .required(),
          font:joi.string()
          .valid('Helvetica','monospace','comic sans','open dyslexic','sans serif','serif')
          .default('helvetica')
          .required(),
          navBarPos:joi.string()
          .valid('top','fixed')
          .default('fixed')
          .required(),
          editorVersion:joi.string()
          .valid('basic','advanced')
          .default('advance')
          .required(),
          yourExperience:joi.number()
          .valid(1,2,3,4,5)
          .default(1)
          .required()
     })
     try{
          const value = await schema.validateAsync(req.body)
          console.log(value)
          
          return res.status(201).send('okay')
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