import mongoose from "mongoose";
import Course from "../models/Course.js";

export const createCourse = async (req, res) => {
  try {
    const { title, description } = req.body;
    const author = req.userInfo.userId;
 
    const newCourse = await Course.create({
      title,
      description,
      author,
    });

    return res.status(201).json({
      success: true,
      message: "Course created successfully!",
      data: newCourse,
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      message: "Something went wrong! Please try again.",
    });
  }
};
