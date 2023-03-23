import { Article } from './../../db/schemas/index';

import {
     Request,
     Response
} from 'express'


async function updateUnpublishedArticle(
     req:Request<{},{},{
          articleId:string,
          title:string,
          coverImageUrl:string,
          tags:string[],
          markdown:string
     }>,
     res:Response
){
     let me : User = req.user as User
     console.log(me)
     let userName = me['userName']
     if(!userName){
          return res.status(401).json({
               error:'Authentication required'
          })
     }
     const {
          articleId,
          title,
          coverImageUrl,
          tags,
          markdown
     } = req.body

     try{
          await Article.findOneAndUpdate({
                    owner:userName,
                    articleId,
                    status:'edit'
          },{
               title,
               coverImageUrl,
               tags,
               markdown
          })
          return res.status(200).json({
                    msg:'updated'
          })
     }
     catch(err){
          console.error(err)
          return res.status(500).json({
               err:err.message
          })
     }
}


export default updateUnpublishedArticle