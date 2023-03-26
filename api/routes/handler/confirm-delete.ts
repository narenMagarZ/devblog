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
     const me = req.user as User
     const userName = me['userName']
     if(!userName)
          return res.status(401).json({
               error:'unauthorized request'
          })
     const {
          user,
          articleSlug
     } = req.query 
     if(!user || !articleSlug)
          return res.status(400).json({
               error:'missing user or articleslug'
          })
     if(user !== userName){
          return res.status(401).json({
               error:'not authorized'
          })
     }
     try{
          const articleId = extractArticleIdFromArticleSlug(articleSlug)
          const response = await Article.findOne({
               owner:user,
               articleId
          })
          if(response){
               return res.status(200).json({
                    title:response.title
               })
          }
          else return res.status(404).json({
               error:'article not found'
          })

     }    
     catch(err){
          console.error(err)

     }
}

export default confirmDelete