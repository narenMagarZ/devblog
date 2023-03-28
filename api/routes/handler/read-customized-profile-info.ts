import {
     Request,
     Response
} from 'express'
import { User } from '../../db/schemas'
import _ from 'lodash'

async function readCustomizedProfileInfo(req:Request,res:Response){
     let me : User = req.user as User
     let userName = me['userName']
     if(!userName){
          return res.status(401).json({
               error:'Authentication required'
          })
     }
     try{
          const user = await User.findById(me.id)
          if(user){
               const customizedUserInfo = _.pick(user,['theme','experienceLevel','editorVersion','baseReadingFont','siteNavbar'])
               return res.status(200).json({
                    ...customizedUserInfo
               })
          }
          else return res.status(404).json({
               error:'user not found'
          })
     }
     catch(err){
          console.error(err)
          return res.status(500).json({
               error:err.message
          })
     }
}

export default readCustomizedProfileInfo