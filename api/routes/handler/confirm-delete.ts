import {Request, Response} from 'express'
import { Article } from '../../db/schemas'
import extractArticleIdFromArticleSlug from '../../utils/extract-article-id-from-slug'


async function confirmDelete(
     req:Request<{},{},{},{
          user:string,
          articleSlug:string
     }>,
     res:Response
){
     const user = req.user as User
     if(!user)
          return res.status(401).json({
               error:'authentication required'
          })
     const {
          user:username,
          articleSlug:slug
     } = req.query 
     if(!username || !slug)
          return res.status(400).json({
               error:'missing username or slug'
          })
     if(user.userName !== username){
          return res.status(401).json({
               error:'authentication required'
          })
     }
     try{
          const articleId = extractArticleIdFromArticleSlug(slug)
          const article = await Article.findOne({articleId})
          if(article){
               return res.status(200).json({
                    title:article.title,
                    articleId
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

export default confirmDelete