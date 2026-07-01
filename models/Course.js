import mongoose, { Schema} from "mongoose";

const courseSchema =  new Schema({
    title:{
        type : String,
        required : true,
        trim : true
    },
    description:{
        type : String,
        required : false,
        trim : true
    },
    author:{
        type : Schema.Types.ObjectId,
        ref : 'User',
        required : true
    }
},{timestamps : true})


const Course = mongoose.model('Course',courseSchema)

export default Course