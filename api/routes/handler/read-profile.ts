import { User } from './../../db/schemas/index';

import {
     Request,
     Response
} from 'express'
import _ from 'lodash'
import dayjs from 'dayjs'
import convertStrIdToObjectId from '../../utils/convert-strid-objectid';

async function readProfile(
     req:Request<{
          user:string
     }>,
     res:Response
){
     const me = req.user as User
     const userName = me['userName']
     if(!userName)
          return res.status(401).json({
               error:'unauthorized request'
          })
     const user = req.params.user
     if(!user){
          return res.status(400).json({
               error:'missing user'
          })
     }
     try{
          const userWithArticles = await User.aggregate([
               {
                    $match:{
                         _id:convertStrIdToObjectId(me.id),
                    }
               },
               {
                    $lookup:{
                         from:'articles',
                         as:'article',
                         localField:'userName',
                         foreignField:'owner',
                         pipeline:[
                              {
                                   $match:{
                                        status:'publish'
                                   }
                              },
                              {
                                   $project:{
                                        _id:0,
                                        url:1,
                                        title:1,
                                        likes:1,
                                        comments:1,
                                        tags:1,
                                        readTime:1,
                                        publishedAt:1,
                                        coverImageUrl:1
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
                         article:1,
                    }
               }
          ])
          if(userWithArticles.length === 1){
               const repoUrl = userWithArticles[0].repoUrl
               const response = await (await fetch(repoUrl)).json()
               const repos : {
                    name:string,
                    description:string,
                    language:string,
                    url:string
               }[] = []
               if(response){
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
               const joinedOn = dayjs(userWithArticles[0].createdAt).format('MMM D, YYYY')
               const userDetail = _.omit(userWithArticles[0],['createdAt'])
               return res.status(200).json({
                    ...userDetail,
                    joinedOn,
                    repos,
                    isMe:userName===user
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