import mongoose, { Schema, Types } from "mongoose";

export interface ILesson{
    order: number;
    courseId: Types.ObjectId;
    title: string;
    video: {
        url: string;
        publicId: string;
    };
    description?: string;
    createdAt: Date;
    updatedAt: Date;
}

const lessonSchema = new Schema<ILesson>({
    order: {
        type: Number,
        required: true,
    },
    courseId: {
        type: Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    video: {
        url: {
            type: String,
            required: true,
        },
        publicId: {
            type: String,
            required: true,
        }
    },
    description: {
        type: String,
        required: false,
        trim: true
    }
}, { timestamps: true })

lessonSchema.index({ courseId: 1, order: 1 }, { unique: true })

const Lesson = mongoose.model<ILesson>('Lesson', lessonSchema)

export default Lesson