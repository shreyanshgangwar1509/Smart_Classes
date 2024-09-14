import mongoose, { Document, Schema } from "mongoose";

// export interface Resourse extends Document{
//     title:string,
//     content: string,
//     createdAt:Date,
// }
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
    class:string,
    verifyCode: string,
    verifyCOdeExpiry: Date,
    isverifiedd:boolean, 
}
const StudentSchema: Schema<Student> = new Schema({
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
    class: {
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
    isverifiedd: {
        type: Boolean,
        default:false,
        
    },
})

const StudentModel = mongoose.models.Student as mongoose.Model<Student> || mongoose.model<Student>("Student",StudentSchema)

export default StudentModel;