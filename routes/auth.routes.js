import express from "express"
import requestValidator from "../middlewares/requestValidator.middleware.js"
import {registerUser}  from "../controllers/auth.controller.js"


const router = express.Router()


router.post("/register",requestValidator,registerUser)



export default router