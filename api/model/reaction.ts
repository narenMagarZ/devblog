import mongoose from 'mongoose'
import { db }from '../config/db'

const reactionSchema = new mongoose.Schema({
     articleRId:{
          type:mongoose.Types.ObjectId,
          ref:'article',
          required:true
     },
     createdAt:{
          type:Date,
          default:Date.now
     },
     reactors:[{
          userId:{
               type:mongoose.Types.ObjectId,
               ref:'user',
               required:true
          },
          like:{
               type:Boolean,
               default:false
          },
          unicorn:{
               type:Boolean,
               default:false
          },
          explodingHead:{
               type:Boolean,
               default:false
          },
          raisedHands:{
               type:Boolean,
               default:false
          },
          fire:{
               type:Boolean,
               default:false
          }
     }]
     
})


export default db.model('reaction',reactionSchema)