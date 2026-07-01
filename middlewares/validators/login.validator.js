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