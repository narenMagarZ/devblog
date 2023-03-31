import { db } from '..';

import mongoose from 'mongoose'


const tagSchema = new mongoose.Schema({
     name:{
          type:String,
          required:true
     },
     description:{
          type:String,
          default:''
     },
     followers:{
          type:Number,
          default:0
     },
     theme:{
          type:String,
          default:'#000000'
     },
     postsTagged:{
          type:Number,
          default:0
     }
})

const tagModel = db.model('tag',tagSchema)
export default tagModel