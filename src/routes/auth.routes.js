import express from "express"
import {registerSchema} from "../validators/register.validator.js"
import {loginUser, registerUser}  from "../controllers/auth.controller.js"
import { loginSchema } from "../validators/login.validator.js"
import { validate } from "../middlewares/validate.middleware.js"



const router = express.Router()


router.post("/register",validate(registerSchema),registerUser)
router.post("/login",validate(loginSchema),loginUser)






export default router