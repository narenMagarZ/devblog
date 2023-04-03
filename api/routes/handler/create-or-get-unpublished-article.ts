import { Article } from '../../db/schemas/index';

import {
     Request,
     Response
} from 'express'
import short from 'short-uuid'
import objectId from '../../utils/str-to-objectid';
import _ from 'lodash'

interface article {
     articleId:string
     title:string
     coverImageUrl:string
     tags:string[]
     markdown:string,
     status:string
}
async function getOrCreateUnpublishedArticle(
     req:Request,
     res:Response
){
     let user = req.user as User
     if(!user){
          return res.status(401).json({
               error:'Authentication required'
          })
     }
     let articleDetail : article  = {
          articleId:'',
          title:'',
          coverImageUrl:'',
          tags:[],
          markdown:'',
          status:'edit'
     }
     try{
          
          const result = await Article.findOne({
               userId:objectId(user.id),
               status:'edit'
          })
          if(result){
               articleDetail = {..._.pick(result,['articleId','title','coverImageUrl','tags','markdown','status'])}
          }else {
               // generating new article id
               const articleId = short(short.constants.flickrBase58,{
                    consistentLength:false
               }).generate()
               await new Article({
                    userId:objectId(user.id),
                    articleId
               }).save()
               articleDetail.articleId = articleId
          }
          return res.status(200).json(articleDetail)
     }
     catch(err){
          console.error(err)
          return res.status(500).json({
               err:err.userssage
          })
     }

}


export default getOrCreateUnpublishedArticle