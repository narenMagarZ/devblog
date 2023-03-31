import mongoose from 'mongoose'
import { db } from '..'


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

// followersSchema.index({
//      follower:1,
//      follwing:1
// },{
//      unique:true
// })

const followersModel = db.model('follower',followersSchema)

export default followersModel