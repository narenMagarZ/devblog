import {Response} from 'express'
import generateJwt from './generate-jwt'


function createCookie(res:Response,id:string){
     res.cookie('token',generateJwt(id),{
          sameSite:'strict',
          secure:true,
          httpOnly:true,
          path:'/',
          maxAge:2592000000,
          signed:true
     })
}

export default createCookie