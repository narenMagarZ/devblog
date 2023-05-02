import mongoose from 'mongoose'
import { db } from '../config/db';


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
     reactors:{
          type:[{
               type:mongoose.Types.ObjectId,
               ref:'user'
          }],
          default:[]
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


export default db.model('comment',commentOnPostSchema)
