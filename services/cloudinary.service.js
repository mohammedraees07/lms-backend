import cloudinary from "../config/cloudinary.js"
import fs from "fs"


const removeFromLocal = (filePath)=>{
    if(filePath){
        return fs.unlinkSync(filePath)
    }
}

const uploadToCloudinary = async(filePath) =>{
    try {
        const res = await cloudinary.uploader.upload(filePath,{ resource_type: "video" })

    return({
        url: res.secure_url,
        publicId: res.public_id 
    })
    } catch (error) {
        console.log("Error uploading video to cloudinary!", error)
        throw new Error("Error uploading video to cloudinary!")
    }finally{
        removeFromLocal(filePath)
    }
    
}

export default uploadToCloudinary