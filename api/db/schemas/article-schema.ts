
import mongoose from 'mongoose'
import { db } from '..'

const tagLimit = (tags:[string])=>tags.length <= 4
const articleSchema = new mongoose.Schema({
     title:{
          type:String,
          default:'',
          maxLength:200,
     },
     articleId:{
          type:String,
          required:true,
     },
     status:{
          type:String,
          enum:['draft','publish','edit'],
          default:'edit',
          required:true
     },
     owner:{
          type:String,
          required:true,
          set:(owner:string)=>{
               return owner.toLowerCase()
          }
     },
     tags:{
          type:Array<String>,
          validate:[tagLimit,'{PATH} exceeds the limit of 4'],
          default:[]
     },
     likes:{
          type:Number,
          default:0
     },
     reactions:{
          like:{
               type:Number,
               default:0
          },
          unicorn:{
               type:Number,
               default:0
          },
          explodingHead:{
               type:Number,
               default:0
          },
          raisdeHands:{
               type:Number,
               default:0
          },
          fire:{
               type:Number,
               default:0
          }
     },
     comments:{
          type:Number,
          default:0
     },
     isBookmarked:{
          type:Boolean,
          default:false
     },
     readTime:{
          type:Number,
          default:0
     },
     createdAt:{
          type:Date,
          default:Date.now
     },
     coverImageUrl:{
          type:String,
          default:null
     },
     updatedAt:{
          type:Date,
          default:null
     },
     content:{
          type:String,
          default:''
     },
     markdown:{
          type:String,
          default:''
     },
     publishedAt:{
          type:Date,
          default:null
     },
     isScheduled:{
          type:Boolean,
          default:false
     },
     url:{
          type:String,
          default:null
     },
     scheduledAt:{
          type:Date,
          default:null
     },
     yourReaction:{
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
          raisdedHands:{
               type:Boolean,
               default:false
          },
          fire:{
               type:Boolean,
               default:false
          }
     }

})


const articleModel = db.model('article',articleSchema)
export default articleModel