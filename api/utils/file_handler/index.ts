import multer from 'multer'
import fileStorage from './file-storage'

const upload = multer({
     storage:fileStorage,
     // limits : {
     //      fieldSize:2097152
     // }
})

export default upload