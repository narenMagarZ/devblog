import { db } from '../config/db';
import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
     username : {
          type : String,
          required : true,
          unique:true,
          set:(username:string)=>{
               return username.toLowerCase()
          }
     },
     name:{
          type:String,
          required:true
     },
     tags:{
          type:[],
          default:[]
     },
     email:{
          type:String,
          required:true,
          unique:true
     },
     repoUrl:{
          type:String,
          default:null,
     },
     followers:{
          type:Number,
          default:0
     },
     following:{
          type:Number,
          default:0
     },
     createdAt : {
          type : Date,
          default : Date.now
     },
     avatar:{
          type:String,
          default:null
     },
     bio:{
          type:String,
          default:null
     },
     location:{
          type:String,
          default:null
     },
     websiteUrl:{
          type:String,
          default:null
     },
     skills:{
          type:String,
          default:null
     },
     currentlyHackingOn:{
          type:[],
          default:[]
     },
     currentlyLearning:{
          type:[],
          default:[]
     },
     work:{
          type:String,
          default:null
     },
     education:{
          type:String,
          default:null
     },
     brandColor:{
          type:String,
          default:"#000000"
     },
     theme:{
          type:String,
          enum:['light','dark'],
          default:'light'
     },
     baseReadingFont:{
          type:String,
          enum:['sans serif','monospace','comic sans','serif','open dyslexic','default'],
          default:'default'
     },
     siteNavbar:{
          type:String,
          enum:['Fixed to window','Static top of page'],
          default:'Fixed to window'
     },
     editorVersion:{
          type:String,
          enum:['Rich + markdown','Basic markdown'],
          default:'Rich + markdown'
     },
     experienceLevel:{
          type:String,
          enum:['Novice','Beginner','Mid-level','Advanced','Expert'],
          default:'Beginner'
     }

})

export default db.model('user',userSchema)