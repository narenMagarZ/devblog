
import {
     Request,
     Response
} from 'express'
import { Article } from '../../db/schemas'
import markdownParser from '../../utils/markdown-parser/'
import objectId from '../../utils/str-to-objectid'
import _ from 'lodash'
import createURL from '../../utils/create-url'
import join from '../../utils/join'

interface IArticleDraft {
     title:string
     coverImageUrl:string|null
     markdown:string
     tags:string[]
     status:string
     articleId:string
}
async function createArticleDraft(
     req:Request<{},{},IArticleDraft,{
          articleId:string
          status:'edit'|'draft'|'publish'
     }>,
     res:Response
){
     let user = req.user as User
     if(!user)
          return res.status(401).json({
               error:'Authentication required'
          })
     const {
          articleId,
          status
     } = req.query
     if(!articleId || !status){
          return res.status(400).json({
               err:'missing articleId or status'
          })
     }         
     try{
          const article = await Article.findOne({
               userId:objectId(user.id),
               articleId
          })
          if(!article){
               return res.status(404).json({
                    message:'article not found'
               })
          }
          let url = article.url
               if(status === 'draft' || status === 'publish'){
                    const {
                         title,
                         coverImageUrl,
                         markdown,
                         tags
                    } = req.body
                    await article.updateOne({
                         $set:{
                              title,
                              coverImageUrl,
                              markdown,
                              tags,
                              content:markdownParser(markdown)
                         }
                    })
               } else{
                    let {
                         markdown,
                         title,
                         coverImageUrl,
                         tags
                    } = article
                    url = createURL(title,articleId)
                    await article.updateOne({
                         $set:{
                              status:'draft',
                              content:markdownParser(markdown),
                              markdown:markdown,
                              tags,
                              coverImageUrl,
                              url
                         }
                    })
               }
               return res.status(200).json({
                    message:'ok',
                    url:join('/',user.userName,url)
               })

}
     catch(err){
          console.error(err)
          return res.status(500).json({
               error:err.message
          })
     }
}


export default createArticleDraft