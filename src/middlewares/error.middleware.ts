import type { Request, Response, NextFunction } from "express"
import config from '../config/config.js'




export class AppError extends Error {
    statusCode: number
    constructor(message: string, statusCode: number) {
        super(message)
        this.statusCode = statusCode
        this.name = "AppError"
    }
}

export const errorMiddleware = (
    err: unknown,
    req: Request,
    res: Response,
    next: NextFunction
): void => {

    let statusCode: number;
    let message: string;
    let stack : string | undefined ;

     if (err instanceof AppError) {
            statusCode = err.statusCode
            message = err.message
            stack= err.stack
        } else if (err instanceof Error) {
            statusCode = 500
            message = err.message
            stack= err.stack
        }
        else {
            statusCode = 500
            message = "Internal Server Error"
        }


    if (config.NODE_ENV === "development") {
       res.status(statusCode).json({
        success: false,
        message,
        stack
       })
       return;
    } else {
      res.status(statusCode).json({
        success: false,
        message,
       })
       return;
    }
}