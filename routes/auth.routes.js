import express from "express"
import registerValidator from "../middlewares/validator/registerValidator.middleware.js"
import {loginUser, registerUser}  from "../controllers/auth.controller.js"
import loginValidator from "../middlewares/validator/loginValidator.middleware.js"



const router = express.Router()


router.post("/register",registerValidator,registerUser)
router.post("/login",loginValidator,loginUser)




export default router