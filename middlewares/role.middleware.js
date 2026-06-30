
export const teacherOnly = (req,res,next)=>{
    
    if(req.userInfo.role !== "teacher"){
        return res.status(403).json({
            success : false,
            message : "Access denied. Teacher privileges required."
        })
    }

    next()
}