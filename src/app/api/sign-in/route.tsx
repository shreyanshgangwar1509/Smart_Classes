import { dbconnect } from "@/lib/dbconnect";
import StudentModel from "@/model/student";
import TeacherModel from "@/model/teacher";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    await dbconnect();
    
    try {
        const { username, password } = await request.json();

        // Finding user by username and password in student model
        const student = await StudentModel.findOne({ username, password });
        
        // Finding user by username and password in teacher model
        const teacher = await TeacherModel.findOne({ username, password });

        if (student || teacher) {
            // Redirect to a URL with the username in the path
            return NextResponse.redirect(`/profile`);
        } else {
            return NextResponse.json({
                success: false,
                message: "Invalid username or password",
            }, { status: 400 });
        }
    } catch (error) {
        console.log('Error during sign-in:', error);
        return NextResponse.json({
            success: false,
            message: "An error occurred during sign-in",
        }, { status: 500 });
    }
}
