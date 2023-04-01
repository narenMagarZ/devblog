

import {
     Request,
     Response
} from 'express'
import _ from 'lodash'
import { Article } from '../../db/schemas'
import extractArticleIdFromArticleSlug from '../../utils/extract-article-id-from-slug'
import extractComment from '../../utils/extract-comment'
import objectId from '../../utils/str-to-objectid'
import dayjs from 'dayjs'

async function readArticle(
     req:Request<{
          user:string,
          articleslug:string
     }>,
     res:Response
){

     const user = req.user as User
     const userId = user.id
     const {
          user:userName,
          articleslug:slug
     } = req.params
     if(!userName || !slug){
          return res.status(400).json({
               message:'missing username or slug'
          })
     }
     const articleId = extractArticleIdFromArticleSlug(slug)
     try{
          const test = await Article.aggregate([
               {
                    $match:{
                         articleId
                    }
               }
          ])
          console.log(test,'test')
          const thisArticle = await Article.aggregate([
               {
                    $match:{
                         articleId
                    }
               },
               {
                    $lookup:{
                         from:'users',
                         as:'userInfo',
                         localField:'userId',
                         foreignField:'_id',
                         pipeline:[
                              {
                                   $project:{
                                        _id:0,
                                        id:{
                                             $toString:'$_id'
                                        },
                                        userName:1,
                                        name:1,
                                        url:1,
                                        picture:1,
                                        work:1,
                                        education:1,
                                        createdAt:1,
                                        bio:1,
                                        location:1,
                                        brandColor:1
                                   }
                              }
                         ]
                    }
               },
               {
                    $lookup:{
                         from:'comments',
                         as:'commentsOnPost',
                         localField:'_id',
                         foreignField:'postId',
                         pipeline:[
                              {
                                   $lookup:{
                                        from:'users',
                                        as:'user',
                                        localField:'commentBy',
                                        foreignField:'userName',
                                        pipeline:[
                                             {
                                                  $project:{
                                                       _id:0,
                                                       userName:1,
                                                       name:1,
                                                       url:1,
                                                       picture:1,
                                                       bio:1,
                                                       work:1,
                                                       education:1,
                                                       location:1,
                                                       createdAt:1,
                                                       theme:1
                                                  }
                                             }
                                        ]
                                   }
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
                                        text:1,
                                        commentBy:1,
                                        createdAt:1,
                                        likes:1,
                                        isLikedByYou:{
                                             $in:[objectId(userId),'$reactors']
                                        },
                                        user:1
                                   }
                              }
                         ]
                    }
               },
               {
                    $lookup:{
                         from:'reactions',
                         as:'userReaction',
                         localField:'_id',
                         foreignField:'articleRId',
                         pipeline:[{
                              $project:{
                                   _id:0,
                                   reactor:{
                                        $filter:{
                                             input:'$reactors',
                                             as:'reactor',
                                             cond:{
                                                  $eq:['$$reactor.userId',objectId(userId)]
                                             }
                                        }
                                   }
                              }
                         }]
                    }
               },
                  {
                    $project:{
                         _id:0,
                         articleId:1,
                         title:1,
                         likes:1,
                         postBy:1,
                         reactions:1,
                         numUsersAddedToReadingList:1,
                         comments:1,
                         content:1,
                         isBookMarked:{
                              $in:[objectId(userId),'$readingListUserIds']
                         },
                         coverImageUrl:1,
                         tags:1,
                         userInfo:{
                              $arrayElemAt:['$userInfo',0]
                         },
                         commentsOnPost:1,
                         userReaction:{
                              $arrayElemAt:[{
                                   $arrayElemAt:['$userReaction.reactor',0]
                              },0]
                         }
                    }
               }
          ])
          console.log(thisArticle,'thisArticle')
          if(!_.isEmpty(thisArticle)){
               const {
                    userInfo,
                    ...articleInfo
               } = thisArticle[0]
               const articleComments = extractComment(articleInfo.commentsOnPost)
               delete articleInfo.commentsOnPost
               const isMe = user.userName === userName
               let temp = articleInfo.userReaction ||={
                    like:false,
                    fire:false,
                    raisedHands:false,
                    explodingHead:false,
                    unicorn:false
               }
               if(!_.isEmpty(temp)){
                    articleInfo.userReaction = _.omit(temp,['_id','userId'])
               }
               const joinedAt = dayjs(userInfo.createdAt).format('MMM DD, YYYY')
               delete userInfo.createdAt
               return res.status(200).json({
                    user:{
                         ...userInfo,
                         joined:joinedAt,
                         isMe
                    },
                    article:articleInfo,
                    comments:articleComments
               })

          }
          else {
               return res.status(404).json({
                    msg:'article not found'
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


export default readArticle