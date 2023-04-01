import { ObjectId } from 'mongoose';
import {
     Request,
     Response
} from 'express'
import { Article, Comment } from '../../db/schemas'
import _ from 'lodash'
import objectId from '../../utils/str-to-objectid';

async function likeOnComment(
     req:Request<{},{},{},{
          commentId:string
          articleId:string
     }>,
     res:Response
){
     const user = req.user as User
     if(!user)
          return res.status(401).json({
               error:'Authentication required'
          })
     let {
          commentId,
          articleId
     } = req.query
     if(!commentId || !articleId){
          return res.status(400).json({
               error:'missing commentId or articleId'
          })
     }
     try{
          const [article,comment] = await Promise.all([
               Article.findOne({articleId}),
               Comment.findById(commentId)
          ])
          if(article && comment){
               const index = comment.reactors.findIndex(reactor=>{
                    const reactorId = (reactor as ObjectId).toString()
                    if(reactorId === user.id) return reactorId
               })
               console.log(index)
               const operation = _.gte(index,0) ? {
                    $inc:{
                         likes:-1
                    },
                    $pull:{
                         reactors:{$eq:objectId(user.id)}
                    }
                    
               } : {
                    $inc:{
                         likes:1
                    },
                    $push:{
                         reactors:objectId(user.id)
                    }
                    
               }
               await comment.updateOne(operation)
               return res.status(200).json({
                    message:'done'
               })
          }else {
               return res.status(404).json({
                    message:'article or comment not found'
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

export default likeOnComment