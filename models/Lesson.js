import mongoose,{Schema} from "mongoose";

const lessonSchema = new mongoose.Schema({
    order:{
        type: Number,
        required: true,
    },
    courseId:{
        type : Schema.Types.ObjectId,
        ref: 'Course',
        required : true
    },
     title:{
        type : String,
        required : true,
        trim : true
    },
    video:{
        videoURL:{
            type : String,
            required : true,
        },
        publicId : {
            type : String,
            required : true,
        }
    },
    description:{
        type : String,
        required : false,
        trim : true
    }
},{ timestamps: true })

lessonSchema.index({courseId :1, order :1},{unique: true})

const Lesson = mongoose.model('Lesson',lessonSchema)

export default Lesson