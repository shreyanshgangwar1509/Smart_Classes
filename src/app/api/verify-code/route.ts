import { dbconnect } from "@/lib/dbconnect";
import StudentModel from "@/model/student";
import TeacherModel from "@/model/teacher";

export async function POST(request: Request) {
    await dbconnect()

    try {
        const { username, code } = await request.json();
        const decodedusername = decodeURIComponent(username);
        const student = await StudentModel.findOne({ username: decodedusername })
        const teacher = await TeacherModel.findOne({ username: decodedusername })
        if (!student && !teacher) {
            return Response.json(
                {
                    succcess: false,
                    message:"Usr not found"
                }, {
                    status:500
                }
            )
        }
        let user;
        if (student) {
            user = student;
        }
        else { user = teacher; }

        const isCodeValid = user.verifyCode == code
        const isCodeNotExpired = new Date(user.verifyCOdeExpiry) > new Date()
        
        if (isCodeValid && isCodeNotExpired) {
            user.isverified = true
            await user.save();
            return Response.json(
                {
                    succcess: true,
                    message:"User verified successfully"
                }, {
                    status:200
                }
            )
        }
        else if (!isCodeNotExpired) {
            return Response.json(
                {
                    succcess: false,
                    message:"Verfication code is expired please signup again "
                }, {
                    status:400
                }
            )
        }
        else {
            return Response.json(
                {
                    succcess: false,
                    message:"Invalid Verfication code "
                }, {
                    status:400
                }
            )
        }

    } catch (error) {
        console.error("Error checking username ", error)
        return Response.json({
            success: false,
            message:"Error checking username"
        }, {
            status:500
        })
    }
}