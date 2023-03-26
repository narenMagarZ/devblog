
import {
     Request,
      Response
} from 'express'
import { User } from '../../db/schemas'
import convertStrIdToObjectId from '../../utils/convert-strid-objectid'
import createRelativeDateTime from '../../utils/create-relative-datetime'


async function dashboard(
     req:Request,
     res:Response
){
     const me = req.user as User
     const userName = me['userName']
     if(!userName)
          return res.status(401).json({
               error:'unauthorized request'
          })
     try{
          const user = await User.aggregate([
               {
                    $match:{
                         userName,
                         _id:convertStrIdToObjectId(me.id)
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
                         // tags:{
                         //      $size:'$tags'
                         // },
                         following:1,
                         followers:1,
                         article:1
                    }
               }
          ])
          if(user.length === 1){
               let totalPosts = 0
               for(let i of user[0].article ){
                    console.log(i)
                    const articleStatus = i.status
                    totalPosts++
                    if(articleStatus === 'publish'){
                         const articlePublishedDate = i.publishedAt
                         i.views = i.views ? i.views : 0
                         i.publishedAt = createRelativeDateTime(articlePublishedDate)
                         i.updatedAt = createRelativeDateTime(i.updatedAt||articlePublishedDate)
                    }
               }
               user[0].totalPosts = totalPosts
               if(!user[0].tags) user[0].tags = 0
               return res.status(200).json({
                    ...user[0],
               })

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