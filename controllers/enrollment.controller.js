import Enrollment from "../models/Enrollment.js";

export const enrollCourse = async (req, res) => {
  try {
    const courseId = req.courseId;
    const userId = req.userInfo.userId;

    const newEnrollment = await Enrollment.create({
      userId,
      courseId,
    });
    return res.status(201).json({
      success: true,
      message: "user enrolled successfully!",
      data: newEnrollment,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "You are already enrolled in this course.",
      });
    }
    return res.status(500).json({
      success: false,
      message: "Something went wrong! Please try again.",
    });
  }
};
