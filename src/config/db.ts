import mongoose from "mongoose";
import config from "./config.js"


const MONGO_URI = config.MONGO_URI;

 const connectToDB = async(): Promise<void>=>{
    try {
        await mongoose.connect(MONGO_URI)
        console.log("Mongodb connected successfully!");
        
    } catch (error) {
        console.error("Mongodb connection failed",(error as Error).message);
        process.exit(1) 
    }
}
export default connectToDB

