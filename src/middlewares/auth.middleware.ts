import type { Request, Response ,NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
import type { IUser } from "../models/User.js";

export type jwtPayload = {
  userId : string
  username : string
  role : IUser["role"]
}

export type AuthRequestContext = {
  userInfo : jwtPayload
}


const authMiddleware = (req:Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  const token = authHeader?.split(" ")[1];

  if (!token) {
    res.status(401).json({
      success: false,
      message: "Unauthorized User",
    });
    return; 
  }

  try {
    const decodedInfo = jwt.verify(token, config.JWT_SECRET_KEY) as jwtPayload;

    (req as any).userInfo = decodedInfo ;

    next();
  } catch (error) {
    res.status(403).json({
        success : false,
        message : 'Invlaid token'
    })
    return; 
  }
};

export default authMiddleware
