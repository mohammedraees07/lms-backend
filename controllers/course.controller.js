import mongoose from "mongoose"
import Course from "../models/Course.js"


export const createCourse = async(req,res)=>{

    const{title,description} =  req.body
    const {author} = req.userInfo.userID

    const errors = {}

    if(!title){
        errors.title = "Title is required"
    }
    
    const newCourse = await Course.create({
        title,
        description,
        author
    })

    if(Object.keys(errors).length>0){
        return res.status(400).json({errors})
    }

    return res.status(201).json({
        success : true,
        message : 'Course created successfully!',
        data: newCourse
    })

}