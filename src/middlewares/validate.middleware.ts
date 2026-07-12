import type { Request, Response, NextFunction } from "express"
import { z } from "zod"

export const validate = (schema: z.ZodType) => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const parsedData = await schema.parseAsync({
                body: req.body,
                query: req.query,
                params: req.params
            }) as any

            // we overWrite this bcz if user snd smtg which is diff type we go to schema check for availablity and for its type and then overwrite so we get clean formatted data so its like client side validation (looks into contract and see the thing i asked is what client snt)
            req.body = parsedData.body
            req.query = parsedData.query
            req.params = parsedData.params

            next()
        } catch (error) {
            // we check whether the error is smtg passed by zod if yes we return tht formated error in terminal
            if (error instanceof z.ZodError) {
                const formatedErrors = z.flattenError(error);


                res.status(400).json({
                    success: false,
                    message: "Input validation Failed",
                    errors: formatedErrors.fieldErrors,
                })
                return;
            }
            next(error) //if above condtion doesnt meet it will safely use global error without crashing
        }
    }

}

// fieldErrors -> gives the error cleanly for each filed like title email check etc