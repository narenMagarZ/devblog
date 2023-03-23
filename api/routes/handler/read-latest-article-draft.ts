
import {
     Request,
     Response
} from 'express'

function readLatestArticleDraft(
     req:Request,
     res:Response
){
     return res.status(200).json({
          data:{
               id:'',
               coverImage:'',
               title:'',
               tags:'',
               content:'',
               user:'',
               createdAt:'',
               url:'',
               picture:'',
          }
     })
}


export default readLatestArticleDraft