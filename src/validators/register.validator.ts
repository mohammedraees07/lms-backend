import { z } from "zod"


const allowedAccountTypes = ["student", "teacher"] as const;

export const registerSchema = z.object({
  body: z.object({
    username: z
    .string()
    .min(1, "Username is required")
    .min(5, "Username must be at least 5 characters long")
    .trim().lowercase(),
    email: z
    .email("Please enter a valid email address")
    .min(1, "Email is required")
    .trim()
    .lowercase(),
    password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password needs at least one uppercase letter")
    .regex(/[a-z]/, "Password needs at least one lowercase letter")
    .regex(/[0-9]/, "Password needs at least one numeric digit")
    .regex(/[@$!%*?&]/, "Password needs at least one special character (@$!%*?&)"),

    accountType: z.enum(allowedAccountTypes,{
        message : "Account type must be either student or teacher",
    })
    .default("student")
  })
})




/*

Old register validator bfz zod: 

const registerValidator = (req, res, next) => {

  const { username, email, password, accountType } = req.body;

  const errors = {};

  if (!username) {
    errors.username = "Username is required";
  } else if (username.length < 5) {
    errors.username = "Username must be at least 5 characters";
  }
  if (!email) {
    errors.email = "Email is required";
  } else if (!emailRegex.test(email)) {
    errors.email = "Please enter a valid email address";
  }

  if (!password) {
    errors.password = "Password is required";
  } else if (password.length < 8) {
    errors.password = "Password must be at least 8 characters";
  }

  if (accountType !== "teacher" && accountType !== "student") {
    errors.accountType = "Account type must be either student or teacher";
  } // this validation is done bcz sometimes someone myt use api to send accType as hacker or smtg so we must make it shld be either of this

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  next();

};

export default registerValidator;

*/
