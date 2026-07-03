export const teacherOnly = (req, res, next) => {
  if (req.userInfo.role !== "teacher") {
    return res.status(403).json({
      success: false,
      message:
        "Access denied. You need to be a teacher to upload the course/lesson",
    });
  }

  next();
};

export const studentOnly = (req, res, next) => {
  if (req.userInfo.role !== "student") {
    return res.status(403).json({
      success: false,
      message: "Access denied. You need to be a student to enroll this course",
    });
  }

  next();
};
