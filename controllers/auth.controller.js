import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config/config.js"

export const registerUser = async (req, res) => {
  try {
    const { username, email, accountType, password } = req.body;

    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    }).lean();

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message:
          "User already exists with this username or email. Please try different username or email",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let role;

    if (accountType === "teacher") {
      role = "pending_teacher";
    } else {
      role = "student";
    }

    await User.create({
      username,
      email,
      password: hashedPassword,
      role: role,
    });

    return res.status(201).json({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong! Please try again.",
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).lean();

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found!",
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "Incorrect credentials! Please enter the valid credentials",
      });
    }

    if(user.role === "pending_teacher"){
      return res.status(403).json({
        success : false,
        status : 'pending_teacher',
        message : "Teacher account is pending verification."
      })
    }

    const accessToken = jwt.sign(
      {
        userId: user._id,
        username: user.username,
        role: user.role,
      },
      config.JWT_SECRET_KEY,
      {
        expiresIn: "15m",
      },
    );


    return res.status(200).json({
      success: true,
      message: "User logged in Successfully",
      accessToken,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong! Please try again.",
    });
  }
};
