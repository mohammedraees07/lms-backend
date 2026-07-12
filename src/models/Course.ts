import mongoose, { Schema, Types } from "mongoose";

export interface ICourse {
    title: string;
    description?: string;
    author: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const courseSchema = new Schema<ICourse>({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: false,
        trim: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true })


const Course = mongoose.model<ICourse>('Course', courseSchema)

export default Course