import multer from "multer";
import path from "path"


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null,
        file.fieldname + '-' + Date.now() + path.extname(file.originalname)
    )
  }
})

const checkFileFilter = (req,file,cb) => {
   if(file.mimetype.startsWith('video')){
    cb(null,true)
   }else{
    cb(new Error('Not a video! upload only videos.'))
   }
}

const upload = multer({
    storage: storage,
    fileFilter : checkFileFilter,
    limits : {
        fileSize : 70 * 1024 * 1024
    }
})

export default upload.single("video")