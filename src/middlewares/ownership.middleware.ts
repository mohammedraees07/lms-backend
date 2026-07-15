import type { Request, Response, NextFunction } from "express"
import type {ICourse} from "../models/Course.js"

type OwnerShipContext = {
    course : ICourse
    userInfo : {
        userId : string,
        role : string
    }
}

type OwnerShipRequest = Request & OwnerShipContext  // for the request from express we attach contract so it follows the exact rule (compile-time only)

export const checkCourseOwnership = (req: OwnerShipRequest,res: Response,next: NextFunction): void =>{
    try{
          if((req.course.author as any).toString() !== req.userInfo.userId){
         res.status(403).json({
            success: false,
            message : "Access denied. You don't have permission to perform this action."
        })
        return;
    }
    next();
}catch(error){
    next(error)
}
}


/* Few things i understood when building this :

use zod for : run time which we know but with this many thing got clear like when we interact with client data and validate it or if we talk with external api's we use zod to validate as it happens during run time

use Pure Typescript : when we do internal checks like when we interact with db n all then create a contract and use it for validation/type checks
Use TypeScript for everything inside application where you control the data it make sure variable/data and its type is consistent across application without any typo

Well if we look : (everything follows defense in depth)

zod is gatepass guards and validates client data
typescript for dev : for data and its type to be consistent across files without typo (JS if we have 2000lines of code in a file and we have 30 file then who's gonna crct tht typo dmannn) 

again we're not saying le db take this and save we do final security check bfr take off.. are u the expected guy? then come in hehehehe
 
*/
   
