import mongoose,{Schema} from "mongoose";

export interface IUser{
   username : string;
   email: string;
   password: string;
   role: "pending_teacher"|"student"|"teacher"|"admin";
   createdAt : Date;
   updatedAt : Date;
}

const userSchema = new Schema<IUser>(
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

const User = mongoose.model<IUser>('User', userSchema)

export default User;


