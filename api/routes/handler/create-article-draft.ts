
import {
     Request,
     Response
} from 'express'
import { Article } from '../../db/schemas'
import markdownParser from '../../utils/markdown-parser/'
import slugify from 'slugify'

async function createArticleDraft(
     req:Request<{},{
          articleId:string
     }>,
     res:Response
){
     let me : User = req.user as User
     let userName = me['userName']
     if(!userName)
          return res.status(401).json({
               error:'Authentication required'
          })
     const {
          articleId
     } = req.query

     if(!articleId){
          return res.status(400).json({
               err:'missing articleId'
          })
     }         
     try{
          const prevArticle = await Article.findOne({
               owner:userName,
               articleId
          })
          if(prevArticle){
               const {
                    status,
                    markdown,
                    title,
                    url
               } = prevArticle
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
               const newDraftedArticle = await Article.updateOne(
                    {
                    owner:userName,
                    articleId
                    },
               {
                    $set:{
                         status:'draft',
                         content:markdownParser(markdown),
                         url:status === 'edit' ? createURL(title) : url
                    }
               },{
                    new:true
               })
               console.log(newDraftedArticle,'new article')
               return res.status(200).json({
                    msg:'draft updated',
                    url:newDraftedArticle['url']
               })
          }else {
               return res.status(404).json({
                    err:'article not found'
               })
          }
}
     catch(err){
          console.error(err)
          return res.status(500).json({
               err:err.message
          })
     }
}


export default createArticleDraft