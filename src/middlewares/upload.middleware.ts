import type {Request} from "express"
import multer from "multer";
import path from "path"


const storage = multer.diskStorage({
    destination: (req: Request, file:Express.Multer.File , cb: (error: Error| null, destination: string)=>void ):void =>{
    cb(null, 'uploads/')
  },
  filename: (req:Request, file: Express.Multer.File,cb: (error: Error| null, filename: string)=>void ):void => {
    cb(null,
        file.fieldname + '-' + Date.now() + path.extname(file.originalname)
    )
  }
})

const checkFileFilter = (req: Request,file: Express.Multer.File,cb: multer.FileFilterCallback ): void => {
   if(file.mimetype.startsWith('video')){
    cb(null,true)
   }else{
    cb(new Error('Not a video! upload only videos.') as any ,false)
   }
}

// y as any? bcz here FiltercheckCall back expects (null,true/false) for custom we loosen its restriction 

const upload = multer({
    storage: storage,
    fileFilter : checkFileFilter,
    limits : {
        fileSize : 70 * 1024 * 1024
    }
})

export default upload.single("video")