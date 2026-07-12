import type { Request,Response,NextFunction } from "express";
import type{ IUser } from "../models/User.js";

type roleContext = {
   userInfo :{ 
    role : IUser["role"]
  }
}


type roleRequest = Request & roleContext


export const teacherOnly = (req: roleRequest, res: Response, next: NextFunction): void => {
  if (req.userInfo.role !== "teacher") {
    res.status(403).json({
      success: false,
      message:
        "Access denied. You need to be a teacher to upload the course/lesson",
    });
    return; 
  }

  next();
};

export const studentOnly = (req: roleRequest, res:Response, next: NextFunction): void => {
  if (req.userInfo.role !== "student") {
    res.status(403).json({
      success: false,
      message: "Access denied. You need to be a student to enroll this course",
    });
    return 
  }

  next();
};
