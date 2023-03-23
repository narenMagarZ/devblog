import {
     Request,
     Response
} from 'express'
import { Article } from '../../db/schemas'
import slugify from 'slugify'
import dayjs from 'dayjs'
import markdownParser from '../../utils/markdown-parser/'



async function publishArticle(
     req:Request<{},{
          articleId:string
     }>,
     res:Response
){
     const me : User = req.user as User
     const userName = me.userName
     if(!userName)
          return res.status(401).json({
               error:'Authenticated required'
          })
     const {
          articleId
     } = req.query
     if(!articleId)
          return res.status(400).json({
               error:'missing article id'
          })
     try{
          const myArticle = await Article.findOne({
               articleId,
               owner:userName
          })
          if(myArticle){
               let {
                    title,
                    url
               } = myArticle
               if(title.length < 1)
                    return res.status(400).json({
                         error:'Article cannot be published',
                         message:'The title field is required to publish an article'
                    })
               if(!url){
                    const createURL = (title:string)=>{
                         const slug = slugify(title,{
                              lower:true,
                              strict:true,
                              trim:true
                         })
                         return '/'.concat(
                              userName,
                              '/',
                              slug,
                              '-',
                              articleId as string)
                    }
                    url = createURL(title)
               }
               await Article.findByIdAndUpdate(myArticle.id,{
                    $set:{
                         status:'publish',
                         content:markdownParser(myArticle.markdown),
                         url,
                         publishedAt:dayjs(Date.now())
                         .format('YYYY-MM-DD HH:mm:ss')
                    }
               })
               return res.status(200).json({
                    url
               })
          }else{
               return res.status(404).json({
                    error:'article not found'
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


export default publishArticle