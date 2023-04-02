import {
     Request,
     Response
} from 'express'
import { Article } from '../../db/schemas'
import markdownParser from '../../utils/markdown-parser/'
import objectId from '../../utils/str-to-objectid'
async function createArticlePreview(
     req:Request<{},{},{
          articleStatus:string
          title:string
          coverImageUrl:string
          tags:string[]
          markdown:string,
          articleId:string
     }>,
     res:Response
){  
     console.log(req.body)
     const user = req.user as User 
     if(!user){
          return res.status(401).json({
               message:'Authentication required'
          })
     }

     const {
          articleStatus,
          title,
          coverImageUrl,
          tags,
          markdown,
          articleId
     } = req.body
          try{
               if(articleStatus === 'edit'){
                    const article = await Article.findOne({
                         userId:objectId(user.id),
                         status:'edit'
                    })
                    if(article){
                         return res.status(200).json({
                              title:article.title,
                              tags:article.tags,
                              coverImageUrl:article.coverImageUrl,
                              content:markdownParser(article.markdown)
                         })
                    }
               }
               else {
                    const article = await Article.findOne({articleId})
                    return res.status(200).json({
                         articleId,
                         title,
                         coverImageUrl,
                         tags,
                         content:markdownParser(markdown)
                    })
               }

          }
          catch(err){
               console.error(err)
               return res.status(500).json({
                    err:err.message
               })
          }

}

export default createArticlePreview