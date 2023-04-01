import {
     Request,
     Response
} from 'express'
import { Article } from '../../db/schemas'
import dayjs from 'dayjs'
import markdownParser from '../../utils/markdown-parser/'
import createURL from '../../utils/create-url'
import join from '../../utils/join'



async function publishArticle(
     req:Request<{},{},{
          articleId:string
     }>,
     res:Response
){
     const user = req.user as User
     if(!user)
          return res.status(401).json({
               error:'Authenticated required'
          })
     const {articleId} = req.body
     if(!articleId)
          return res.status(400).json({
               error:'missing articleId'
          })

     try{
          const article = await Article.findOne({articleId})
          if(article){
               let {
                    title,
                    url,
                    markdown
               } = article
               const len = (str:string)=>str.length===0
               if(len(title)){
                  return res.status(400).json({
                    message:'title should be provided'
                  })  
               }
               if(!url)
               url = createURL(title,articleId)
               await article.updateOne({
                    $set:{
                         url,
                         status:'publish',
                         content:markdownParser(markdown),
                         publishedAt:dayjs(Date.now())
                    }
               })
               return res.status(200).json({
                    message:'ok',
                    url:join('/',user.userName,url)
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