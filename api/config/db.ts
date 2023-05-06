
import { logger } from './../utils/logger';
import mongoose, { Connection } from 'mongoose'

export let db : Connection
try{
     db = mongoose.createConnection('mongodb://127.0.0.1:27017/devblog')
     db.on('error',(err)=>{
          logger.error(err.message)
     })
     db.on('connected',()=>{
          logger.log('database connected')
     })
     db.on('close',()=>{
          logger.log('database connection closed')
     })
}
catch(err){
     const error = err as Error
     logger.error(error.message)
}

