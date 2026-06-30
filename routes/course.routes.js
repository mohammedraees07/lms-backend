import express from "express"
import authMiddleware from "../middlewares/auth.middleware.js"
import {teacherOnly} from "../middlewares/role.middleware.js"
import { createCourse } from "../controllers/course.controller.js"



const router = express.Router()



router.post("/create",authMiddleware,teacherOnly,createCourse)


export default router