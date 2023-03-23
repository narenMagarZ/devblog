

import {
     Request,
     Response
} from 'express'
import { Article } from '../../db/schemas'


interface User {
     uId:string
     name:string
     userName:string
     email:string
}
async function readArticle(
     req:Request<{
          user:string,
          articleslug:string
     }>,
     res:Response
){

     let me : User = req.user as User
     let userName = me['userName']
     if(!userName){
          return res.status(401).json({
               error:'Authentication required'
          })
     }
     const {
          user:owner,
          articleslug:articleSlug
     } = req.params

     const index = articleSlug.lastIndexOf('-')
     const articleId = articleSlug.slice(index+1,articleSlug.length)
     const url = '/'.concat(
          owner,
          '/',
          articleSlug)
     try{
          const thisArticle = await Article.aggregate([
               {
                    $match:{
                         articleId,
                         url,
                         owner
                    }
               },
               {
                    $lookup:{
                         from:'users',
                         as:'userInfo',
                         localField:'owner',
                         foreignField:'userName',
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
                                        joined:1,
                                        bio:1,
                                        location:1
                                   }
                              }
                         ]
                    }
               },
                  {
                    $project:{
                         _id:0,
                         title:1,
                         likes:1,
                         postBy:1,
                         reactions:1,
                         comments:1,
                         content:1,
                         isBookMarked:1,
                         coverImageUrl:1,
                         tags:1,
                         userInfo:1,
                         yourReaction:1,
                    }
               }
          ])
          if(thisArticle[0]){
               const {
                    userInfo,
                    ...articleInfo
               } = thisArticle[0]
               console.log(userInfo[0])
               console.log(articleInfo)
               if(!articleInfo['yourReaction'] && !articleInfo['reactions']){
                    articleInfo['yourReaction'] = {
                         like:false,
                         unicorn:false,
                         explodingHead:false,
                         raisedHands:false,
                         fire:false
                    } 
                    articleInfo['reactions'] = {
                         like:0,
                         unicorn:0,
                         explodingHead:0,
                         raisedHands:0,
                         fire:0
                    }
               }
               const isMe = userName === owner 
               return res.status(200).json({
                    user:{
                         ...userInfo[0],
                         isMe
                    },
                    article:articleInfo
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