import type {Request , Response, NextFunction} from "express"
import User, {type IUser} from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config/config.js"

type RegisterInput = {
  username : string
  email : string
  accountType : "student"|"teacher"
  password : string
}

type LoginInput = {
  email : string
  password : string
}

export const registerUser = async (req: Request<{},{},RegisterInput>, res: Response, next : NextFunction) : Promise<void>  => {
  try {
    const { username, email, accountType, password } = req.body;

    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    }).lean();

    if (existingUser) {
      res.status(409).json({
        success: false,
        message:
          "User already exists with this username or email. Please try different username or email",
      });
      return; 
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    //here we tell like accountype which is allowed is teacher and student , and this shld match the contract of schema i mean it shldnt be smtg new
    
    const roleMapping : Record<RegisterInput["accountType"],IUser["role"]>={
      teacher : "pending_teacher",
      student : "student"
    }

    const finalRole = roleMapping[accountType]


    // let role;

    // if (accountType === "teacher") {
    //   role = "pending_teacher";
    // } else {
    //   role = "student";
    // }

    await User.create({
      username,
      email,
      password: hashedPassword,
      role: finalRole,
    });

    res.status(201).json({
      success: true,
      message: "User created successfully",
    });
    return ;
  } catch (error) {
    next(error)
  }
};

export const loginUser = async (req: Request<{},{},LoginInput>, res: Response, next : NextFunction): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found!",
      });
      return;
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      res.status(401).json({
        success: false,
        message: "Incorrect credentials! Please enter the valid credentials",
      });
      return;
    }

    if(user.role === "pending_teacher"){
      res.status(403).json({
        success : false,
        status : 'pending_teacher',
        message : "Teacher account is pending verification."
      })
      return;
    }

    const accessToken = jwt.sign(
      {
        userId: user._id.toString(),
        username: user.username,
        role: user.role,
      },
      config.JWT_SECRET_KEY,
      {
        expiresIn: "15m",
      },
    );


    res.status(200).json({
      success: true,
      message: "User logged in Successfully",
      accessToken,
    });
    return 
  } catch (error) {
    next(error)
  }
};
