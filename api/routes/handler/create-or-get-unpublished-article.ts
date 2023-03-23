import { Article } from '../../db/schemas/index';

import {
     Request,
     Response
} from 'express'
import short from 'short-uuid'


interface article {
     articleId:string
     title:string
     coverImageUrl:string
     tags:string[]
     markdown:string
}
async function getOrCreateUnpublishedArticle(
     req:Request,
     res:Response
){
     let me : User = req.user as User
     let userName = me['userName']
     if(!userName){
          return res.status(401).json({
               error:'Authentication required'
          })
     }
     let articleDetail : article  = {
          articleId:'',
          title:'',
          coverImageUrl:'',
          tags:[],
          markdown:''
     }
     try{
          
          const result = await Article.findOne({
               owner:userName,
               status:'edit'
          })
          if(result){
               articleDetail = {
                    articleId:result.articleId,
                    title:result.title,
                    coverImageUrl:result.coverImageUrl,
                    tags:result.tags,
                    markdown:result.markdown,
               }
               
          }else {
               const articleId = short(short.constants.flickrBase58,{
                    consistentLength:false
               }).generate()
               await new Article({
                    owner:userName,
                    articleId
               }).save()
               articleDetail['articleId'] = articleId
          }
          console.log(articleDetail)
          return res.status(200).json(articleDetail)
     }
     catch(err){
          console.error(err)
          return res.status(500).json({
               err:err.message
          })
     }

}


export default getOrCreateUnpublishedArticle