import mongoose from 'mongoose'
import { db } from '../config/db'


const followersSchema = new mongoose.Schema({
     follower:{
          type:mongoose.Schema.Types.ObjectId,
          required:true,
          ref:'users'
     },
     following:{
          type:mongoose.Schema.Types.ObjectId,
          required:true,
          ref:'users'
     },
     createdAt:{
          type:Date,
          default:Date.now
     }

})

export default db.model('follower',followersSchema)
