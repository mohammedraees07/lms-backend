import mongoose, {Schema, Types} from "mongoose";


export interface IEnrollment{
    userId: Types.ObjectId;
    courseId: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const enrollmentSchema = new Schema<IEnrollment>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    courseId: {
        type: Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
}, { timestamps: true })

enrollmentSchema.index({ userId: 1, courseId: 1 }, { unique: true })

const Enrollment = mongoose.model<IEnrollment>('Enrollment', enrollmentSchema)

export default Enrollment