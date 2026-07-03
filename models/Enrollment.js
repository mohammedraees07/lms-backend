import mongoose,{Schema} from "mongoose";


const enrollmentSchema = new Schema({
     userId:{
        type : Schema.Types.ObjectId,
        ref: 'User',
        required : true
    },
     courseId:{
        type : Schema.Types.ObjectId,
        ref: 'Course',
        required : true
    },
},{timestamps:true})

enrollmentSchema.index({userId : 1 , courseId : 1},{unique: true})

const Enrollment = mongoose.model('Enrollment', enrollmentSchema)

export default Enrollment