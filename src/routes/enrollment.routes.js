import { enrollCourse } from "../controllers/enrollment.controller.js";
import express from "express"
import authMiddleware from "../middlewares/auth.middleware.js";
import { studentOnly } from "../middlewares/role.middleware.js";
import { checkCourseExists } from "../middlewares/course.middleware.js";



const router = express.Router();



router.post("/:courseId",authMiddleware,studentOnly,checkCourseExists,enrollCourse)

export default router