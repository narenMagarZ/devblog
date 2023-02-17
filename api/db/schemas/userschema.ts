import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
     userName : {
          type : String,
          required : true
     },
     accountType : {
          type : String,
          enum : ['github','twitter','google','email'],
          required : true
     },
     accountId : {
          type : String,
          required : true
     },
     password : {
          type : String,
          required : true,
          default : ''
     },
     createdAt : {
          type : Date,
          required : Date.now
     },
     profileUrl : {type:String,default:''},
     profilePicture : {type:String,default:''}
})

export const userModel = mongoose.model('user',userSchema)