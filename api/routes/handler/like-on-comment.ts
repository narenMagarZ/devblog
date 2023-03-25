import {
     Request,
     Response
} from 'express'
import { Article, Comment } from '../../db/schemas'
import convertStrIdToObjectId from '../../utils/convert-strid-objectid'
import extractArticleIdFromArticleSlug from '../../utils/extract-article-id-from-slug'

async function likeOnComment(
     req:Request<{},{},{},{
          user:string,
          articleSlug:string,
          id:string,
          state:string
     }>,
     res:Response
){
     const me = req.user as User
     const userName = me['userName']
     console.log(req.query,'req.query')
     if(!userName)
          return res.status(401).json({
               error:'unauthorized request'
          })
     let {
          user,
          articleSlug,
          id,
          state
     } = req.query
     if(!user || !articleSlug || !id || !state){
          return res.status(400).json({
               error:'missing fields'
          })
     }
     const articleId = extractArticleIdFromArticleSlug(articleSlug)
     try{
          const article = await Article.findOne({
               owner:user,
               articleId
          })
          console.log(article)
          if(article){
               const x = state === 'true' ? -1 : 1
               const y = state === 'true' ? true : false
               await Comment.findOneAndUpdate({
                    _id:convertStrIdToObjectId(id),
                    postId:convertStrIdToObjectId(article.id)
               },{
                         $inc:{
                              likes:x
                         },
                         $set:{
                              isLikedByYou:!y,
                         }
               })
               return res.status(200).json({
                    message:'ok'
               })
          }else{
               return res.status(400).json({
                    error:'article not found'
               })
          }

     }
     catch(err){
          console.error(err)
          return res.status(500).json({
               error:err.message
          })
     }
}

export default likeOnComment