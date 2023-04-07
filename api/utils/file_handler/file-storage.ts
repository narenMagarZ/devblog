import {
     diskStorage
} from 'multer'
import path from 'path'
import {v4} from 'uuid'


const fileStorage =  diskStorage({
     destination:(req,file,cb)=>{
          const mediaDirectory = path.resolve(__dirname,'../../images')
          console.log(mediaDirectory)
          cb(null,mediaDirectory)
     },
     filename:(req,file,cb)=>{
          const fileName = v4().split('-').join('') + '.' + file.mimetype.split('/')[1]
          console.log(file)
          cb(null,fileName)
     }

})



export default fileStorage