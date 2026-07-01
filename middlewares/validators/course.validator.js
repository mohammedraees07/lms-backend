import Course from "../../models/Course.js";


export const validateTitleInput = (req, res, next) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ success: false, message: "Title is required" });
  }
  next();
};


export const checkCourseExists = async(req,res,next)=>{
    const {courseId} = req.params
    const course = await Course.findById(courseId)

    if(!course){
        return res.status(400).json({
            success : false,
            message : "Course not found!"
        })
    }
    req.courseId = course._id
    next()
}