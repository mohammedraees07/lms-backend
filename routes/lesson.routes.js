import express from "express"
import { checkCourseExists, validateTitleInput } from "../middlewares/validators/course.validator.js"
import { createLesson } from "../controllers/lesson.controller.js"
import authMiddleware from "../middlewares/auth.middleware.js"
import { teacherOnly } from "../middlewares/role.middleware.js"
import uploadMiddleware from "../middlewares/upload.middleware.js"


const router = express.Router()



router.post("/create/:courseId",authMiddleware,teacherOnly,checkCourseExists,uploadMiddleware,validateTitleInput,createLesson)



export default router