import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      trim: true,
      unique: true,
      lowercase : true,
      minlength : 5,
      maxlength : 20
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      unique: true, 
      lowercase : true,
      match : [/\S+@\S+\.\S+/, "Please use a valid email address"]
    },
    password: {
      type: String,
      minlength: 8,
      required: [true, "password is required"],
    },
    role: {
      type: String,
      enum: ["pending_teacher","student", "teacher", "admin"],
      default: "student",
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model('User', userSchema)

export default User
