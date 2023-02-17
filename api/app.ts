import express from 'express'
import { router } from './routes'


export default function app(){
     try{
          const server = express()
          server.use('/',router)
          return server
     }
     catch(err){
          console.error(err)
     }
}