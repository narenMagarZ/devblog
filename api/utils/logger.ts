
import {createLogger,transports,format} from 'winston'
import {resolve} from 'path'


const {combine,timestamp,printf} = format

const timestampFormat = timestamp({
     format : 'DD-MM-YYYY HH:mm:ss.SSS'
})
const consoleFormat = printf(({message})=>message)
const fileFormat = printf(({message,timestamp})=>{
     return `${timestamp}\t ${message}`
})
const pathToLogFile = resolve(__dirname,'../logs')
const winstonLogger = createLogger({
     levels : {
          error:0,
          info:1
     },
     transports : [
          new transports.File({
               level : 'error',
               filename : resolve(pathToLogFile,'error.log'),
               format:combine(timestampFormat,fileFormat)
          }),
          new transports.Console({
               level : 'info',
               format:consoleFormat
          }),
     ]
})

export const logger = {
     log : (message:string)=>winstonLogger.log('info',message),
     error : (message:string)=>winstonLogger.error(message)
}

