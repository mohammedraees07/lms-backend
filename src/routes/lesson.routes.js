import express from "express"
import {titleValidateSchema} from "../validators/course.validator.js"
import { createLesson } from "../controllers/lesson.controller.js"
import authMiddleware from "../middlewares/auth.middleware.js"
import { teacherOnly } from "../middlewares/role.middleware.js"
import uploadMiddleware from "../middlewares/upload.middleware.js"
import { validate } from "../middlewares/validate.middleware.js"
import { checkCourseExists } from "../middlewares/course.middleware.js"


const router = express.Router()



router.post("/create/:courseId",authMiddleware,teacherOnly,checkCourseExists,validate(titleValidateSchema),uploadMiddleware,createLesson)



export default router