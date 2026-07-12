import type{Request , Response , NextFunction} from "express"
import Course from "../models/Course.js";
import { getPaginatedCourses, type CourseQueryParams } from "../services/course.service.js";
import type { AuthRequestContext } from "../middlewares/auth.middleware.js";
import type { CourseExistsContext } from "../middlewares/course.middleware.js";

type CreateCourseBody = {
  title : string,
  description : string,
}


// so here <Body={}> bcz we myt pass smtg like course contract when creating course but in getMyCourse n all we dont need to pass since we dont create anything which need this contract, after =  we say body we get shld follow this contract tht is CourseQueryParams and its authentication shld follow this contract - AuthRequestContext 

type AuthenticatedRequest<Body={}> = Request<{},{},Body,CourseQueryParams> & AuthRequestContext

type CourseRouteRequest  = Request &  CourseExistsContext

export const createCourse = async (req: AuthenticatedRequest<CreateCourseBody>, res: Response, next : NextFunction): Promise<void> => {
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

export const getAllCourse = async (req: Request<{},{},{},CourseQueryParams>, res: Response, next:NextFunction) : Promise<void> => {
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

export const getMyCourse = async (req: AuthenticatedRequest, res: Response,next : NextFunction): Promise<void> => {
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

export const getCourseById = async (req:CourseRouteRequest, res: Response, next : NextFunction): Promise<void> => {
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
