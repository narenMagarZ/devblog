import {
     Request,
     Response
} from 'express'
import { Article } from '../../db/schemas'


async function searchBlogPost(
     req:Request<{q:string}>,
     res:Response
){
     try{
          const {
               q
          } = req.query
          if(q){
               const blogPosts = await Article.aggregate([
                    {
                         $match:{
                              $or:[
                                   {
                                        tag:{
                                             $regex:/q/,
                                             $options:'i'
                                        }
                                   },
                                   {
                                        title:{
                                             
                                        }
                                   }
                              ]
                         }
                    }
               ])
               
          }
     }
     catch(err){
          console.error(err)
          return res.status(500).json({
               msg:'internal server error'
          }) 
     }
}

export default searchBlogPost