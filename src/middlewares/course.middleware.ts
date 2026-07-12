// check course exits
import type { Request, Response, NextFunction } from "express";
import type { ICourse } from "../models/Course.js";
import Course from "../models/Course.js";


// courseId - in payload later on it may consider that as a string but in db its an object we're not sure of so we set it as unknown to be safe

export type CourseExistsContext = {
    course?: ICourse,
    courseId : unknown
}

type courseRouteRequest = Request & CourseExistsContext

export const checkCourseExists = async(
    req: courseRouteRequest,
    res : Response,
    next: NextFunction
): Promise<void> =>{
    try {
        const {courseId} = req.params
        const course = await Course.findById(courseId)

        if(!course){
            res.status(404).json({
                success : false,
                message: "Course not found!"
            })
            return; 
        }

        req.course = course;
        req.courseId = course._id;
        next()
    } catch (error) {
        next(error)    
    }
}

