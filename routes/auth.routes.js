import express from "express"
import registerValidator from "../middlewares/validators/register.validator.js"
import {loginUser, registerUser}  from "../controllers/auth.controller.js"
import loginValidator from "../middlewares/validators/login.validator.js"



const router = express.Router()


router.post("/register",registerValidator,registerUser)
router.post("/login",loginValidator,loginUser)






export default router