import {Request, Response} from 'express'
import { Article } from '../../db/schemas'

async function deleteArticle(
     req:Request<{
          articleId:string
     }>,
     res:Response
){
     const user = req.user as User
     if(!user)
          return res.status(401).json({
               error:'Authentication required'
          })
     const {
          articleId
     } = req.params
     if(!articleId)
          return res.status(400).json({
               error:'missing articleId'
          })
     try{
          const article = await Article.findOne({articleId})
          if(article?.userId.toString() === user.id){
               await article.deleteOne()
               return res.status(200).json({
                    message:'deleted'
               })
          }
          else return res.status(404).json({
               error:'article not found'
          })

     }    
     catch(err){
          console.error(err)
          return res.status(500).json({
               error:err.message
          })
     }
}

export default deleteArticle