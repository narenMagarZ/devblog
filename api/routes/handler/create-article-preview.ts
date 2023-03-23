import {
     Request,
     Response
} from 'express'
import markdownParser from '../../utils/markdown-parser/'
import path from 'path'
import fs from 'fs/promises'
async function createArticlePreview(
     _req:Request,
     res:Response
){
     const userName = 'narenmagarz'
     const pathToUnpublishedArticle = path.join(
          __dirname,
          process.env.PATH_TO_ARTICLE_COLLECTION||'')
          try{
               const data = await fs.readFile(pathToUnpublishedArticle,'utf8')
               const articles = JSON.parse(data)
               const myArticleData = articles[userName]
               if(myArticleData){
                    const htmlContent = markdownParser(myArticleData.markdownContent)
                    return res.status(200).json({
                         htmlContent,
                         title:myArticleData.title,
                         tags:myArticleData.tags,
                         coverImageUrl:myArticleData.coverImageUrl
                    })
               }else{
                    return res.status(200).json({
                         htmlContent:'',
                         title:'',
                         tags:[],
                         coverImageUrl:''
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

export default createArticlePreview