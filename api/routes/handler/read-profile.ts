import { User } from './../../db/schemas/index';

import {
     Request,
     Response
} from 'express'
import _ from 'lodash'
import dayjs from 'dayjs'
import mongoose from 'mongoose';
import objectId from '../../utils/str-to-objectid';
import join from '../../utils/join';

async function readProfile(
     req:Request<{
          username:string
     }>,
     res:Response
){
     const user = req.user as User
     const {username} = req.params
     if(!username){
          return res.status(400).json({
               message:'missing username'
          })
     }
     try{

          const userWithArticles = await User.aggregate([
               {
                    $match:{
                         userName:username,
                    }
               },
               {
                    $lookup:{
                         from:'followers',
                         as:'followers',
                         localField:'_id',
                         let:{
                              userId:'$_id',
                              followerId:new mongoose.Types.ObjectId(user.id)
                         },
                         foreignField:'following',
                         pipeline:[
                              {
                                   $match:{
                                        $expr:{
                                             $and:[
                                                  {$eq:['$follower','$$followerId']},
                                                  {$eq:['$following','$$userId']}
                                             ]
                                        }
                                   }
                              }
                         ]
                    }
               },
                              {
                    $lookup:{
                         from:'articles',
                         as:'articles',
                         localField:'_id',
                         foreignField:'userId',
                         pipeline:[
                              {
                                   $match:{
                                        status:'publish'
                                   }
                              },
                              {
                                   $project:{
                                        _id:0,
                                        articleId:1,
                                        url:1,
                                        title:1,
                                        likes:1,
                                        comments:1,
                                        tags:1,
                                        readTime:1,
                                        publishedAt:1,
                                        coverImageUrl:1,
                                        isBookmarked:{
                                             $in:[objectId(user.id),'$readingListUserIds']
                                        }
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
                         name:1,
                         userName:1,
                         location:1,
                         work:1,
                         education:1,
                         createdAt:1,
                         skills:1,
                         brandColor:1,
                         email:1,
                         repoUrl:1,
                         currentlyHackingOn:1,
                         currentlyLearning:1,
                         websiteUrl:1,
                         bio:1,
                         picture:1,  
                         articles:1,
                         followers:1,
                         isFollowed:{
                              $cond:{
                                   if:{
                                        $eq:[
                                             {$size:'$followers'}
                                             ,0]
                                   },
                                   then:false,
                                   else:true
                              }
                         }
                    }
               }
          ])
          console.log(userWithArticles[0],'user with articles')
          if(!_.isEmpty(userWithArticles)){
               const repoUrl = userWithArticles[0].repoUrl
               const response = await (await fetch(repoUrl)).json()
               const repos : {
                    name:string,
                    description:string,
                    language:string,
                    url:string
               }[] = []
               if(response){
                    if(Array.isArray(response))
                         response.map((repo)=>{
                              const {
                                   name,
                                   description,
                                   language,
                                   visibility,
                                   html_url
                              } = repo
                              if(visibility==='public')
                                   repos.push({
                                        name,
                                        description,
                                        language,
                                        url:html_url
                                   })
                         })
               }
               const articles = userWithArticles[0].articles
               _.forEach(articles,(article)=>{
                    const url = join('/',username,article.url)
                    article.url = url
                    const publishedAt = article.publishedAt
                    article.publishedAt = dayjs(publishedAt).format('MMM DD, YYYY')
               })
               const joinedOn = dayjs(userWithArticles[0].createdAt).format('MMM D, YYYY')
               const userDetail = _.omit(userWithArticles[0],['createdAt'])
               return res.status(200).json({
                    ...userDetail,
                    joinedOn,
                    repos,
                    isMe:user.userName===username
               })
          }
          else {
               return res.status(404).json({
                    error:'profile not found'
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


export default readProfile