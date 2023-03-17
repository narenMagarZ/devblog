
import {
     Request,
     Response
} from 'express'
import { Article, User } from '../../db/schemas'
import createRelativeDateTime from '../../utils/create-relative-datetime'


async function fetchArticlesPreview(
     req:Request<{},{},{},{
          skip?:string
     }>,
     res:Response
){
     try{
          
          const me = req.user as User
          const userName = me?.userName
          const skip = parseInt(req.query.skip ?? '0')
          try{
                    const articles = await Article.aggregate([
                         {
                              $match:{
                                   status:'publish'
                              }
                         },
                         {
                              $lookup:{
                                   from:'users',
                                   as:'user',
                                   foreignField:'userName',
                                   localField:'owner',
                                   pipeline:[
                                        {
                                             $project:{
                                                  _id:0,
                                                  userName:1,
                                                  picture:1,
                                                  url:1
                                             }
                                        }
                                   ]
                              }
                         },
                         {
                              $project:{
                                   _id:0,
                                   articleId:1,
                                   title:1,
                                   coverImageUrl:1,
                                   url:1,
                                   status:1,
                                   tags:1,
                                   likes:1,
                                   comments:1,
                                   readTime:1,
                                   isBookMarked:1,
                                   publishedAt:1,
                                   // updatedAt:1
                                   user:1
                              }
                         },
                         {
                              $limit:10
                         },
                         {
                              $skip:skip
                         }
                    ])  
                    for(let i of articles){
                         console.log(i)
                    }
                    const finalArticles = articles.map(article=>({
                         ...article,
                         publishedAt:createRelativeDateTime(article.publishedAt)
                    }))
                    return res.status(200).json({
                         articles:finalArticles
                    })
          }
          catch(err){
               console.error(err)
               return res.status(500).json({
                    error:err.message
               })
          }

     }
     catch(err){
          console.error(err)
          return res.status(500).json({
               error:'internal server error'
          })
     }
}
export default fetchArticlesPreview