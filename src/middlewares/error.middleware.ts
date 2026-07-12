import type {Request , Response, NextFunction} from "express"
import config from '../config/config.js'


export const errorMiddleware=(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
): void =>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error"

    if(config.NODE_ENV === "development"){
        res.status(statusCode).json({
            success: false,
            message,
            stack: err.stack
        })
        return;
    }else{
        res.status(statusCode).json({
            success: false,
            message: statusCode === 500? "Internal Server Error": message,
        })
         return;
    }
}