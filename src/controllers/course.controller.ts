import type { Request, Response, NextFunction } from "express"
import Course from "../models/Course.js";
import { getPaginatedCourses, type CourseQueryParams } from "../services/course.service.js";
import type { AuthRequestContext } from "../middlewares/auth.middleware.js";
import type { CourseExistsContext, CourseRequest } from "../middlewares/course.middleware.js";
import { sanitizeInput } from "../utils/sanitizeInput.js";

import Lesson from "../models/Lesson.js";
import cloudinary from "../config/cloudinary.js";
import Enrollment from "../models/Enrollment.js";
import mongoose from "mongoose";
import { AppError } from "../middlewares/error.middleware.js";

type CreateCourseBody = {
  title: string,
  description: string,
}
type UpdateCourseBody = {
  title?: string,
  description?: string,
}


// so here <Body={}> bcz we myt pass smtg like course contract when creating course but in getMyCourse n all we dont need to pass since we dont create anything which need this contract, after =  we say body we get shld follow this contract tht is CourseQueryParams and its authentication shld follow this contract - AuthRequestContext 

type AuthenticatedRequest<Body = {}> = Request<{}, {}, Body, CourseQueryParams> & AuthRequestContext

// Route contract
type CourseRouteRequest = Request & CourseExistsContext

// update Contract
type CourseUpdateRequest = Request<{}, {}, UpdateCourseBody> & CourseRequest & AuthRequestContext

type deleteRequest = Request & AuthRequestContext & CourseExistsContext





export const createCourse = async (req: AuthenticatedRequest<CreateCourseBody>, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { title, description } = req.body;
    const author = req.userInfo.userId;

    const newCourse = await Course.create({
      title,
      description,
      author,
    });

    res.status(201).json({
      success: true,
      message: "Course created successfully!",
      data: newCourse,
    });
    return;
  } catch (error) {
    next(error)
  }
};

export const getAllCourse = async (req: Request<{}, {}, {}, CourseQueryParams>, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { courses, pagination } = await getPaginatedCourses({}, req.query);

    res.status(200).json({
      success: true,
      ...pagination,
      data: courses,
    });
    return;
  } catch (error) {
    next(error)
  }
};


// Teacher : 
export const getMyCourse = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { courses, pagination } = await getPaginatedCourses(
      { author: req.userInfo.userId },
      req.query,
    );

    res.status(200).json({
      success: true,
      ...pagination,
      data: courses,
    });
    return;
  } catch (error) {
    next(error)
  }
};

export const getCourseById = async (req: CourseRouteRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const course = await Course.findById(req.courseId);
    res.status(200).json({
      success: true,
      data: course,
    });
    return;
  } catch (error) {
    next(error)
  }
};


export const updateCourse = async (req: CourseUpdateRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    let title, description;

    title = sanitizeInput(req.body.title) ?? req.course.title;
    description = sanitizeInput(req.body.description) ?? req.course.description;

    const updatedCourse = { title, description }

    const data = await Course.findByIdAndUpdate(req.courseId, updatedCourse, { new: true })

    res.status(200).json({
      status: true,
      message: "Course Updated Successfully",
      data: data,
    })

  } catch (error) {
    next(error)
  }

}

export const deleteCourse = async (req: deleteRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const lessons = await Lesson.find({ courseId: req.courseId })

      //  starts deletion waits till all deltion is completes then move forward

      // at this point i hit the bottleneck of need for transactions since i shld be very specific and careful on data consistency i mean either u go all at once or be here not like enrollments gone lesson still exists etc vice-versa

      // well for now even though we have fallback for DB with transactions  we dont have similar thing cloudinary which could revert so rn i can only think of leaving it as orphan data 

      if (lessons.length > 0) {
      await Promise.all(lessons.map((lesson)=>{
          cloudinary.uploader.destroy(lesson.video.publicId);
       }))
      }

       const session = await mongoose.startSession();
       try {
        session.startTransaction();

         await Lesson.deleteMany({ courseId: req.courseId },{session})
        
         await Enrollment.deleteMany({ courseId: req.courseId },{session})

         await Course.findByIdAndDelete(req.courseId,{session})

         await session.commitTransaction();
       } catch(error){
          await session.abortTransaction();
          throw new AppError("Course Deletion Failed!",500)
          // i have used 500 SC bcz here problem is DB 
       }finally{
        session.endSession();
       }
    
    res.status(200).json({
      success: true,
      message: "Course deleted successfully!"
    })
    return;
  } catch (error) {
    next(error)
  }
}
