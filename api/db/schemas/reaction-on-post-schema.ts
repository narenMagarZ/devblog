import mongoose from 'mongoose'
import { db }from '..'

const reactionOnPostSchema = new mongoose.Schema({
     postId:{
          type:mongoose.Types.ObjectId,
          ref:'blogpost',
          required:true,
          unique:true
     },
     createdAt:{
          type:Date,
          default:Date.now
     },
     reactedBy:{
          type:mongoose.Types.ObjectId,
          ref:'user',
          required:true,
          unique:true
     },
     
})


const reactionOnPostModel = db.model('reaction',reactionOnPostSchema)
export default reactionOnPostModel