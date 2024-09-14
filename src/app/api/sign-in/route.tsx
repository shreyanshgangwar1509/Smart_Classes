import { dbconnect } from "@/lib/dbconnect";
// import StudentModel from "@/model/student";
import StudentModel from "@/model/student";

// dbconnect()

export async function POST(reqest: Request) {
    await dbconnect()
    try {
        const { username, email, password } = await reqest.json();
        // finding user by username
        const user = StudentModel.findOne({ username, password })
        // finding user by email 
    }
    catch(error) {
        console.log(error);
        
    }
}

