import {
     Request,
     Response
} from 'express'


function generateImageUrl(
     req:Request,
     res:Response
){
     console.log(req.file)
     const domain = 'http://localhost:5000/image/'
     const url = domain + req.file?.filename
     return res.status(200).json({url})
}

export default generateImageUrl