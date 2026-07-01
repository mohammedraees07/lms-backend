import express from "express"
import authMiddleware from "../middlewares/auth.middleware.js"
import {teacherOnly} from "../middlewares/role.middleware.js"
import { createCourse } from "../controllers/course.controller.js"
import { validateTitleInput } from "../middlewares/validators/course.validator.js"



const router = express.Router()



router.post("/create",authMiddleware,teacherOnly,validateTitleInput,createCourse)


export default router