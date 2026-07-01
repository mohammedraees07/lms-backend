import mongoose from "mongoose";
import Lesson from "../models/Lesson.js";
import uploadToCloudinary from "../services/cloudinary.service.js";
import cloudinary from "../config/cloudinary.js";

export const createLesson = async (req, res) => {
  try {
    const { title, description } = req.body;
    const courseId = req.courseId;
    let { order } = req.body;

    const prevLessonsCount = await Lesson.countDocuments({ courseId });

    if (order === undefined || order === null || order === "") {
      order = prevLessonsCount + 1;
    } else {
      order = Number(order);
      if (Number.isNaN(order) || !Number.isInteger(order) || order <= 0) {
        return res.status(400).json({
          success: false,
          message: "Order must be a positive integer greater than 0.",
        });
      }
    }

    const { url, publicId } = await uploadToCloudinary(req.file.path);
    const newLesson = new Lesson({
      courseId,
      order,
      title,
      video: { url, publicId },
      description,
    });

    try {
      await newLesson.save();
    } catch (error) {
      await cloudinary.uploader.destroy(publicId, { resource_type: "video" });
      return res.status(500).json({
        success: false,
        message: "Failed to save data! Please try again.",
      });
    }

    return res.status(201).json({
      success: true,
      message: "Lesson uploaded successfully.",
      data: newLesson,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong! Please try again.",
    });
  }
};
