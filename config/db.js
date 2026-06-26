import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

const connectToDB = async()=>{
    try {
        await mongoose.connect(MONGO_URI)
        console.log("Mongodb connected successfully!");
        
    } catch (error) {
        console.error("Mongodb connection failed ",error);
        process.exit(1) 
    }
}

export default connectToDB