import cloudinary from "../config/cloudinary.js"
import fs from "fs"


type cloudinaryUploadResult={
    url : string,
    publicId : string
}

const removeFromLocal = (filePath : string): void=>{
    if(filePath && fs.existsSync(filePath)){
        return fs.unlinkSync(filePath)
    }
}

const uploadToCloudinary = async(filePath : string): Promise<cloudinaryUploadResult> =>{
    try {
        const res = await cloudinary.uploader.upload(filePath,{ resource_type: "video" })

    return({
        url: res.secure_url,
        publicId: res.public_id 
    })
    } catch (error) {
        console.log("Error uploading video to cloudinary!", (error as Error).message)
        throw new Error("Error uploading video to cloudinary!")
    }finally{
        removeFromLocal(filePath)
    }
    
}

export default uploadToCloudinary