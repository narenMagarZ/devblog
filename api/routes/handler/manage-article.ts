import {
     Request,
     Response
} from 'express'
import { Article } from '../../db/schemas'
import extractArticleIdFromArticleSlug from '../../utils/extract-article-id-from-slug'
import _ from 'lodash'

async function manageArticle(
     req:Request<{},{},{},{
          user:string,
          articleSlug:string
     }>,
     res:Response){
          let me : User = req.user as User
          let userName = me['userName']
          if(!userName){
               return res.status(401).json({
                    error:'Authentication required'
               })
          }
          const {
               user,
               articleSlug
          } = req.query
          if(!user || !articleSlug)
               return res.status(400).json({
                    error:'missing user or article slug'
               })
          if(user !== userName) 
               return res.status(401).json({
                    error:'unauthorized'
               })
          try{
               const articleId = extractArticleIdFromArticleSlug(articleSlug)
               const article = await Article.findOne({
                    owner:user,
                    articleId
               })
               if(article){
                    const {
                         title,
                         likes,
                         comments,
                         views,
                         publishedAt,
                         updatedAt,
                         url
                    } = article
                    const articleInfo = _.pick(article,['title','likes','comments',
                    'views','publishedAt','updatedAt','url'])
                    res.status(200).json(articleInfo)
               }else return res.status(404).json({
                    error:'article not found'
               })

          }
          catch(err){
               console.error(err)
               return res.status(500).json({
                    error:err.message
               })
          }
}
export default manageArticle