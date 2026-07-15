import express from "express"
import authMiddleware from "../middlewares/auth.middleware.js"
import {teacherOnly} from "../middlewares/role.middleware.js"
import { createCourse, deleteCourse, getAllCourse, getCourseById, getMyCourse, updateCourse } from "../controllers/course.controller.js"
import { checkCourseOwnership } from "../middlewares/ownership.middleware.js"
import { validate } from "../middlewares/validate.middleware.js"
import { titleValidateSchema } from "../validators/course.validator.js"
import { checkCourseExists } from "../middlewares/course.middleware.js"



const router = express.Router()


// teacher
router.post("/create",authMiddleware,teacherOnly,validate(titleValidateSchema),createCourse)
router.get("/my",authMiddleware,teacherOnly,getMyCourse)
router.get("/my/:courseId",authMiddleware,teacherOnly,checkCourseExists,checkCourseOwnership,getCourseById)

// update
router.patch("/:courseId",authMiddleware,teacherOnly,checkCourseExists,checkCourseOwnership,updateCourse)

// delete
router.delete("/:courseId", authMiddleware,teacherOnly,checkCourseExists,checkCourseOwnership,deleteCourse)

// student 
router.get("/",authMiddleware,getAllCourse)
router.get("/:courseId",authMiddleware,checkCourseExists,getCourseById)



export default router