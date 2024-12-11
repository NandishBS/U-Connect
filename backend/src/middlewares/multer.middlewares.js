import multer from 'multer'
import { v4 as uuidv4 } from 'uuid';
import path from 'path'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/temp')
    },
    filename: function(req,file,cb){
        const uniqueName = uuidv4() + path.extname(file.originalname); // Unique UUID
        cb(null, uniqueName);
    }
})

const upload = multer({storage})
export {upload}