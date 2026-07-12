import type {Request , Response, NextFunction} from "express"
import Enrollment from "../models/Enrollment.js";
import type { CourseExistsContext } from "../middlewares/course.middleware.js";
import type { AuthRequestContext } from "../middlewares/auth.middleware.js";


type EnrollCourseRequest = Request & AuthRequestContext & CourseExistsContext

export const enrollCourse = async (req: EnrollCourseRequest, res: Response, next : NextFunction): Promise<void> => {
  try {
    const courseId = req.courseId;
    const userId = req.userInfo.userId;

    // used a any to tell tht I know courseId was verified as a valid MongoDB format by our checkCourseExists
    const newEnrollment = await Enrollment.create({
      userId,
      courseId: courseId as any,
    });
    res.status(201).json({
      success: true,
      message: "user enrolled successfully!",
      data: newEnrollment,
    });
    return; 
  } catch (error: any) {
    if (error.code === 11000) {
    res.status(409).json({
        success: false,
        message: "You are already enrolled in this course.",
      });
    return;
    }
    next(error)
  }
};
