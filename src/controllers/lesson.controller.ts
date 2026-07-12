import type{Request,Response,NextFunction} from "express"

import Lesson from "../models/Lesson.js";
import uploadToCloudinary from "../services/cloudinary.service.js";
import cloudinary from "../config/cloudinary.js";
import type { AuthRequestContext } from "../middlewares/auth.middleware.js";
import type { CourseExistsContext } from "../middlewares/course.middleware.js";

type CreateLessonBody = {
  title : string
  description : string
  order?: string
}

type MulterFileContext = {
  file: Express.Multer.File
}


type LessonRequest = Request<{},{},CreateLessonBody> & AuthRequestContext & CourseExistsContext & MulterFileContext


export const createLesson = async (req: LessonRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { title, description } = req.body;
    const courseId = req.courseId;
    let { order } = req.body;

    const prevLessonsCount = await Lesson.countDocuments({ courseId: courseId as any });

    let finalOrder : number
    if (order === undefined || order === null || order === "") {
      finalOrder = prevLessonsCount + 1;
    } else {
      finalOrder = Number(order);
      if (Number.isNaN(finalOrder) || !Number.isInteger(order) || finalOrder <= 0) {
        res.status(400).json({
          success: false,
          message: "Order must be a positive integer greater than 0.",
        });
        return; 
      }
    }

    const { url, publicId } = await uploadToCloudinary(req.file.path);
    const newLesson = new Lesson({
      courseId,
      order,
      title,
      video: { url, publicId },
      description,
    });

    try {
      await newLesson.save();
    } catch (error) {
      await cloudinary.uploader.destroy(publicId, { resource_type: "video" });
      res.status(500).json({
        success: false,
        message: "Failed to save data! Please try again.",
      });
      return;
    }

    res.status(201).json({
      success: true,
      message: "Lesson uploaded successfully.",
      data: newLesson,
    });
    return;
  } catch (error) {
    next(error)
  }
};
