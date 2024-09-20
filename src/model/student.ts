import mongoose, { Document, Schema } from "mongoose";

export interface Resourse extends Document{
    title:string,
    content: string,
    createdAt:Date,
}
// const ResourseSchemaSchema: Schema<Resourse> = new Schema({
//     title: {
//         typr: String,
//         required:true
//     },
//     content: {
//         type: String,
//         required:true
//     },
//     createdAt: {
//         type: Date,
//         required: true,
//         default:Date.now
//     }
// })
export interface Student extends Document{
    username: string,
    email: string,
    password: string,
    classes:string,
    verifyCode: string,
    verifyCOdeExpiry: Date,
    isverified: boolean, 
    role:string,
    
}
const StudentSchema: Schema<Student> = new Schema({
    email: {
        type: String,
        required: [true, "email is reuired"],
        unique: true,
        // email testing
        match:[/.+\@.+\..+/,'please use a valid email address ']
    },
    role: {
        type: String,
        default:"student",
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
    classes: {
        type: String,
        required: [true,"Class is required"],
    },
    verifyCode: {
        type: String,
        required: [true, "verifycode is reuired"],
    },
    verifyCOdeExpiry: {
        type: Date,
        required: [true, "verifycodeexpiry  is required"],
    },
    isverified: {
        type: Boolean,
        default:false,
        
    },

    // todo: in this generailise it by role as student,teacher,new user , and add isteacher to access resources
})

const StudentModel = mongoose.models.Student as mongoose.Model<Student> || mongoose.model<Student>("Student",StudentSchema)

export default StudentModel;