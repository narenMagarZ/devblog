import {Request, Response} from 'express'
import { Article, Comment } from '../../db/schemas'
import extractComment from '../../utils/extract-comment'

async function commentOnPost(
     req:Request<{},{},{
          comment:string
          parentCommentId?:string
          articleId:string
     }>,
     res:Response){
          const user = req.user as User
          if(!user)
               return res.status(401).json({
                    error:'unauthorized request'
               })
          const {
               comment,
               parentCommentId,
               articleId
          } = req.body
          if(!comment || !articleId){
               return res.status(400).json({
                    error:'missing comment or articleId'
               })
          }
     try{
          const article = await Article.findOne({
               articleId
          })
          if(article){
               await article.updateOne({
                    $inc:{
                         comments:1
                    }
               })
               await new Comment({
                    commentBy:user.userName,
                    postId:article._id,
                    text:comment,
                    parentCommentId
               }).save()
          const comments = await Comment.aggregate([
               {
                    $match:{
                         postId:article._id,
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