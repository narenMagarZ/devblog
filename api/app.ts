import express, { 
     urlencoded,
     Request,
     json
     } from 'express'
import { apiRouter } from './routes'
import cors from 'cors'
import path from 'path'
import passport from 'passport'
import {Strategy as JwtStrategy} from 'passport-jwt'
import { User } from './db/schemas'
import cookieParser from 'cookie-parser'

export const app = express()

try{

     app.use(passport.initialize())
     app.use(cookieParser(process.env.SECRET_KEY as string))
     passport.use(new JwtStrategy({
          secretOrKey:process.env.SECRET_KEY as string,
          jwtFromRequest:(req:Request)=>{
               let token = null
               if(req) token = req.signedCookies.token
               return token
          }
     },async function (payload,done) {
          const {
               id,
          } = payload
          try{
               const user = await User.findById(id)
               if(user){
                    const {
                         userName,
                         name,
                         email,
                         id:uId
                    } = user
                    return done(null,{
                         userName,
                         name,
                         email,
                         id:uId
                    })

               }
               else return done(null,{
                    userName:null
               })
          }
          catch(err){
               return done(err,false)
          }

     }))

     app.use(cors({
          origin:'http://localhost:3000',
          optionsSuccessStatus : 200,
          credentials : true,
          methods : "GET,HEAD,PUT,PATCH,POST,DELETE"
     }))
     app.use('/image',express.static(path.resolve(__dirname,'images')))
     app.use(json())
     app.use(urlencoded({
          extended:false
     }))

     app.use('/api',apiRouter)
}
catch(err){
     console.error(err)
}

