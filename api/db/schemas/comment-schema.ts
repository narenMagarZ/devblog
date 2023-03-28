import mongoose from 'mongoose'
import { db } from '..';


const commentOnPostSchema = new mongoose.Schema({
     postId:{
          type:mongoose.Types.ObjectId,
          ref:'blogpost',
          required:true
     },
     commentBy:{
          type:String,
          required:true
     },
     createdAt:{
          type:Date,
          default:Date.now
     },
     isLikedByYou:{
          type:Boolean,
          default:false
     },
     text:{
          type:String,
          required:true
     },
     parentCommentId:{
          type:mongoose.Types.ObjectId,
          ref:'comment',
          default:null
     },
     likes:{
          type:Number,
          default:0
     }
})


const commentOnPostModel = db.model('comment',commentOnPostSchema)

export default commentOnPostModel