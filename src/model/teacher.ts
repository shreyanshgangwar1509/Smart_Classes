import mongoose, { Document, Schema } from "mongoose";

export interface Resourse extends Document{
    title:string,
    content: string,
    createdAt:Date,
}
const ResourseSchema: Schema<Resourse> = new Schema({
    title: {
        typr: String,
        required:true
    },
    content: {
        type: String,
        required:true
    },
    createdAt: {
        type: Date,
        required: true,
        default:Date.now
    }
})
export interface Teacher extends Document{
    username: string,
    email: string,
    password: string,
    class:string,
    verifyCode: string,
    verifyCOdeExpiry: Date,
    isverifiedd: boolean, 
    resourses:typeof ResourseSchema[],
}
const TeacherSchema: Schema<Teacher> = new Schema({
    email: {
        type: String,
        required: [true, "email is reuired"],
        unique: true,
        // email testing
        match:[/.+\@.+\..+/,'please use a valid email address ']
    },

    username: {
        type: String,
        required: [true, "Username is reuired"],
        unique: true,
        trim:true,
    },
    password: {
        type: String,
        required: [true, "password is required"],
    },
    
    verifyCode: {
        type: String,
        required: [true, "verifycode is reuired"],
    },
    verifyCOdeExpiry: {
        type: Date,
        required: [true, "verifycodeexpiry  is required"],
    },
    isverifiedd: {
        type: Boolean,
        default:false,
        
    },
    resourses: [ResourseSchema],
})

const TeacherModel = mongoose.models.Teacher as mongoose.Model<Teacher> || mongoose.model<Teacher>("Teacher",TeacherSchema)

export default TeacherModel;