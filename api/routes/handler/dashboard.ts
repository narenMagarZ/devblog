
import {
     Request,
      Response
} from 'express'
import { User } from '../../db/schemas'
import createRelativeDateTime from '../../utils/create-relative-datetime'
import objectId from '../../utils/str-to-objectid'
import _ from 'lodash'
import join from '../../utils/join'

async function dashboard(
     req:Request,
     res:Response
){
     const user = req.user as User
     if(!user)
          return res.status(401).json({
               error:'Authentication required'
          })
     try{
          const userResult = await User.aggregate([
               {
                    $match:{
                         _id:objectId(user.id)
                    }
               },
               {
                    $lookup:{
                         from:'articles',
                         as:'article',
                         localField:'_id',
                         foreignField:'userId',
                         pipeline:[
                              {
                                   $match:{
                                        $or:[
                                             {status:'publish'},
                                             {status:'draft'}
                                        ]  
                                   }
                              },
                              {
                                   $project:{
                                        _id:0,
                                        articleId:1,
                                        title:1,
                                        url:1,
                                        owner:1,
                                        likes:1,
                                        comments:1,
                                        status:1,
                                        views:1,
                                        publishedAt:1,
                                        updatedAt:1
                                   }
                              }
                         ]
                    }
               },
               {
                    $project:{
                         _id:0,
                         tagCount:{
                              $size:'$tags'
                         },
                         following:1,
                         followers:1,
                         article:1
                    }
               }
          ])
          if(!_.isEmpty(userResult)){
               const result = userResult[0]
               const articles = result.article
               for(let i of articles){
                    const articleStatus = i.status
                    i.url = join('/',user.userName,i.url)
                    if(articleStatus === 'publish'){
                         const articlePublishedDate = i.publishedAt
                         i.views = i.views ? i.views : 0
                         i.publishedAt = createRelativeDateTime(articlePublishedDate)
                         i.updatedAt = createRelativeDateTime(i.updatedAt||articlePublishedDate)
                    }
               }
               result.totalPosts = articles.length
               return res.status(200).json(result)

          }else {
               return res.status(404).json({
                    error:'user not found'
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


export default dashboard