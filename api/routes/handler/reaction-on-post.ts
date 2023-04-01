import { ObjectId } from 'mongoose';
import { Request, Response } from 'express'
import { Article, Reaction, User } from '../../db/schemas'
import objectId from '../../utils/str-to-objectid'
import _ from 'lodash'

async function reactionOnPost(
     req:Request<{},{},{},{
          type:string
          articleId:string
     }>,
     res:Response
){
     const {
          type,
          articleId
     } = req.query
     const user = req.user as User
     if(!user){
          return res.status(401).json({
               error:'Authentication required'
          })
     }
     if(!articleId || !type)
          return res.status(400).json({
               error:'missing articleId or type or task'
          })
     try{
          const article = await Article.findOne({articleId})
          if(article){
               const userId = user.id
               const reaction  = await Reaction.aggregate([
                    {
                    $match:{
                         articleRId:article._id,
                    }
               },
               {
                    $project:{
                         _id:0,
                         reaction:{
                              $filter:{
                                   input:'$reactors',
                                   as:'reactor',
                                   cond:{
                                        $eq:['$$reactor.userId',objectId(userId)]
                                   }
                              }
                         }
                    }
               }
          ])
          const userReaction = {
               like:false,
               unicorn:false,
               raisedHands:false,
               explodingHead:false,
               fire:false
          }
          if(_.isEmpty(reaction)){
               await Promise.all([
                    article.updateOne({
                         $inc:{
                              likes:1,
                              [`reactions.${type}`]:1
                         }
                    }),
                    new Reaction({
                         articleRId:article._id,
                         reactors:[
                              {
                                   userId:objectId(userId),
                                   ...userReaction,
                                   [type]:true
                              }
                         ]

                    }).save()
               ])
          }
          else if(_.isEmpty(reaction[0].reaction)){
               await Promise.all([
                    article.updateOne({
                         $inc:{
                              likes:1,
                              [`reactions.${type}`]:1
                         }
                    }),
                    Reaction.findOneAndUpdate({
                         articleRId:article._id
                    },{
                         $push:{
                              reactors:{
                                   userId:objectId(userId),
                                   ...userReaction,
                                   [type]:true
                              }
                         }
                    })
               ])
          }
          else {
               const reaction = await Reaction.findOne({
                    articleRId:article._id
               }) 
               if(reaction){
                    let incValue = 1
                    const index = reaction.reactors.findIndex(reactor=>{
                         const id = reactor.userId as ObjectId
                         return id.toString() === userId 
                    })
                    if(_.gte(index,0)){
                         const typeValue = reaction.reactors[index][type]
                         if(typeValue) incValue = -1
                         reaction.reactors[index][type] = !typeValue
                         await reaction.save()
                         await article.updateOne({
                              $inc:{
                                   likes:incValue,
                                   [`reactions.${type}`]:incValue
                              }
                         })
                    }

               }

          }
          return res.status(200).json({
               message:'ok'
          })
          }
          else return res.status(404).json({
               message:'article not found'
          })
     }
     catch(err){
          console.error(err)
          return res.status(500).json({
               error:err.message
          })
     }
}

export default reactionOnPost