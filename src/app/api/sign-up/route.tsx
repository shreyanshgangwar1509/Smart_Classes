import { sendVerificationEmail } from "@/helpers/sendverificationemails";
import { dbconnect } from "@/lib/dbconnect";
import StudentModel from "@/model/student";
import TeacherModel from "@/model/teacher";
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server'; // Import NextResponse

export async function POST(request: Request) {
  await dbconnect(); // Ensure database connection
  
  try {
    const { username, email, password ,classes,selectedRole} = await request.json(); // Parse the request body
    const verifyCode = Math.floor(10000 + Math.random() * 900000).toString();
    // Check if the username already exists and is verified
    if (selectedRole == 'student') {
      const existuserIsVerifiedByusername = await StudentModel.findOne({
        username,
        isverifiedd: true,
      });
      if (existuserIsVerifiedByusername) {
        return NextResponse.json(
          {
            success: false,
            message: "Username already exists",
          },
          {
            status: 400,
          }
        );
      }
      // Check if the email already exists and is verified
      const existinguserByEmail = await StudentModel.findOne({
        email,
        isverifiedd: true,
      });
      if (existinguserByEmail) {
        if (existinguserByEmail.isverifiedd) {
          return NextResponse.json(
            {
              success: false,
              message: "Email already exists with this email",
            },
            { status: 400 }
          );
        } else {
          // Update the existing user's password and verification code
          const hashedPassword = await bcrypt.hash(password, 10);
          existinguserByEmail.password = hashedPassword;
          existinguserByEmail.verifyCode = verifyCode;
          existinguserByEmail.verifyCOdeExpiry = new Date(Date.now() + 3600000); // Set expiry to 1 hour
          await existinguserByEmail.save();
        }
      } else {
        // Create a new user
        const hashedPassword = await bcrypt.hash(password, 10);
        const expiryDate = new Date();
        expiryDate.setHours(expiryDate.getHours() + 1); // Set expiry to 1 hour

        const newUser = new TeacherModel({
          username,
          email,
          classes,
          role:selectedRole,
          password: hashedPassword,
          verifyCOdeExpiry: expiryDate,
          verifyCode,
          isverifiedd: false,
        });

        await newUser.save();
      }
    }
    // making teacher model
    else {
      const existuserIsVerifiedByusername = await TeacherModel.findOne({
        username,
        isverifiedd: true,
      });

      if (existuserIsVerifiedByusername) {
        return NextResponse.json(
          {
            success: false,
            message: "Username already exists",
          },
          {
            status: 400,
          }
        );
      }

      // Check if the email already exists and is verified
      const existinguserByEmail = await TeacherModel.findOne({
        email,
        isverifiedd: true,
      });
      if (existinguserByEmail) {
        if (existinguserByEmail.isverifiedd) {
          return NextResponse.json(
            {
              success: false,
              message: "Email already exists with this email",
            },
            { status: 400 }
          );
        } else {
          // Update the existing user's password and verification code
          const hashedPassword = await bcrypt.hash(password, 10);
          existinguserByEmail.password = hashedPassword;
          existinguserByEmail.verifyCode = verifyCode;
          existinguserByEmail.verifyCOdeExpiry = new Date(Date.now() + 3600000); // Set expiry to 1 hour
          await existinguserByEmail.save();
        }
      } else {
        // Create a new user
        const hashedPassword = await bcrypt.hash(password, 10);
        const expiryDate = new Date();
        expiryDate.setHours(expiryDate.getHours() + 1); // Set expiry to 1 hour

        const newUser = new TeacherModel({
          username,
          email,
          classes,
          role:selectedRole,
          password: hashedPassword,
          verifyCOdeExpiry: expiryDate,
          verifyCode,
          isverifiedd: false,
        });

        await newUser.save();
      }
      
    }

    // Send verification email
    const emailResponse = await sendVerificationEmail(email, username, verifyCode);
    if (!emailResponse.success) {
      return NextResponse.json(
        {
          success: false,
          message: emailResponse.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "User registered successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log('Error registering user', error);
    return NextResponse.json(
      {
        success: false,
        message: "Error registering user",
      },
      {
        status: 500,
      }
    );
  }
}
