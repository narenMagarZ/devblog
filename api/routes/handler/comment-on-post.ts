import {Request, Response} from 'express'
import { Article, Comment } from '../../db/schemas'
import extractArticleIdFromArticleSlug from '../../utils/extract-article-id-from-slug'
import convertStrIdToObjectId from '../../utils/convert-strid-objectid'
import extractComment from '../../utils/extract-comment'

async function commentOnPost(
     req:Request<{},{},{
          comment:string,
          parentCommentId:string|null|undefined
     },{
          user:string,
          articleSlug:string
     }>,
     res:Response){
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
          if(!user || !articleSlug){
               return res.status(400).json({
                    error:'missing fields'
               })
          }
          const {
               comment,
               parentCommentId
          } = req.body
          if(!comment){
               return res.status(400).json({
                    error:'comment must be provided'
               })
          }
     try{
          const articleId = extractArticleIdFromArticleSlug(articleSlug)
          const article = await Article.findOne({
               owner:user,
               articleId
          })
          if(article){
               await new Comment({
                    commentBy:userName,
                    postId:article.id,
                    text:comment,
                    parentCommentId
               }).save()
          const comments = await Comment.aggregate([
               {
                    $match:{
                         postId:convertStrIdToObjectId(article.id),
                    }
               },
               {
                    $lookup:{
                         from:'users',
                         as:'user',
                         localField:'commentBy',
                         foreignField:'userName',
                         pipeline:[
                              {
                                   $project:{
                                        userName:1,
                                        _id:0,
                                        name:1,
                                        url:1,
                                        picture:1,
                                        location:1,
                                        bio:1,
                                        work:1,
                                        education:1,
                                        theme:1
                                   }
                              }
                         ]
                    }
               },
               {
                    $unwind:"$user"
               },
               {
                    $project:{
                         _id:0,
                         id:{
                              $toString:'$_id'
                         },
                         parentCommentId:{
                              $toString:'$parentCommentId'
                         },
                         user:1,
                         text:1,
                         createdAt:1,
                         likes:1,
                         replies:1
                    }
               },
               {
                    $sort:{
                         createdAt :1
                    }
               }
          ])
          const articleComments = extractComment(comments)
          return res.status(200).json({
               articleComments
          })
          }
          else {
               return res.status(404).json({
                    error:'article does not found'
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

export default commentOnPost