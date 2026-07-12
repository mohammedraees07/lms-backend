import {z} from "zod"

export const loginSchema = z.object({
    body: z.object({
        email: z.email("Please enter a valid email address").min(1,"Email is required").trim().lowercase(),
        password: z.string().min(1,"Password is required").min(8,"Password must be at least 8 characters")
    })
})








/* 
Old validator bfr Zod : Fully manual codes with too many boilerplates

const emailRegex = /^\S+@\S+\.\S+$/;

const loginValidator = (req,res,next)=>{
    const {email , password} = req.body

    const errors = {}
    if(!email){
        errors.email = "Email is required"
    }else if (!emailRegex.test(email)){
        errors.email = "Please enter a valid email address"
    }
    if(!password){
        errors.password = "Password is required"
    }else if(password.length < 8){
        errors.password = "Password must be at least 8 characters."
    }

    if(Object.keys(errors).length > 0){
        return res.status(400).json({errors})
    }
    next()
} 

export default loginValidator
*/