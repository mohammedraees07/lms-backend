import User from "../models/User";
import bcrypt from "bcrypt";

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
