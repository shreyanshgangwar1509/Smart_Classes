import mongoose, { Document, Schema } from "mongoose";

// Define the Resourse interface and schema
export interface Resourse extends Document {
    title: string;
    content: string;
    createdAt: Date;
}

const ResourseSchema: Schema<Resourse> = new Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now, // Function reference
    },
});

// Define the Teacher interface and schema
export interface Teacher extends Document {
    username: string;
    email: string;
    password: string;
    class: string;
    verifyCode: string;
    verifyCOdeExpiry: Date;
    isverifiedd: boolean;
    resourses: Resourse[];
    role: string;
}

const TeacherSchema: Schema<Teacher> = new Schema({
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        match: [/.+\@.+\..+/, 'Please use a valid email address'],
    },
    role: {
        type: String,
        default: "teacher",
    },
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    verifyCode: {
        type: String,
        required: [true, "Verification code is required"],
    },
    verifyCOdeExpiry: {
        type: Date,
        required: [true, "Verification code expiry is required"],
    },
    isverifiedd: {
        type: Boolean,
        default: false,
    },
    resourses: [ResourseSchema], // Correctly use the ResourseSchema
});

// Ensure model is not redefined in hot reload environments
const TeacherModel = mongoose.models.Teacher || mongoose.model<Teacher>("Teacher", TeacherSchema);

export default TeacherModel;
