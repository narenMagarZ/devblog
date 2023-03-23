import { Request, Response } from 'express'
import { Article } from '../../db/schemas'

async function reactionOnPost(
     req:Request<{},{},{},{
          type:string,
          articleId:string,
          articleSlug:string
     }>,
     res:Response
){
     const type = req.query.type || 'like'
     const me = req.user as User
     let userName = me['userName']
     if(!userName){
          return res.status(401).json({
               error:'Authentication required'
          })
     }
     try{
          await Article.



     }
     catch(err){
          console.error(err)
          return res.status(500).json({
               error:err.message
          })
     }
}

export default reactionOnPost