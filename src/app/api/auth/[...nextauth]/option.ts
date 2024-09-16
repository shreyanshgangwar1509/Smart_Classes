
import { dbconnect } from "@/lib/dbconnect";
import StudentModel from "@/model/student";
import TeacherModel from "@/model/teacher";
import bcryptjs from "bcryptjs";
import { NextAuthOptions } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  
  providers: [
    // Google provider
    
    // Credentials provider
    CredentialProvider({
      id: "domain-login",
      name: "Credentials",
      credentials: {
        username: { label: "Email", type: "text", placeholder: "shreyansh" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any): Promise<any> {
        await dbconnect();
        try {
          const user = await StudentModel.findOne({ username: credentials.username });
          const teacher = await TeacherModel.findOne({ username: credentials.username });

          if (!user && !teacher) {
            throw new Error("No user found with this email");
          }

          let validUser = null;
          if (user) {
            if (!user.isverifiedd) {
              throw new Error("Please verify your account before logging in");
            }
            const isPasswordCorrect = await bcryptjs.compare(credentials.password, user.password);
            if (isPasswordCorrect) {
              validUser = user;
            }
          } else if (teacher) {
            if (!teacher.isVerified) {
              throw new Error("Please verify your account before logging in");
            }
            const isPasswordCorrect = await bcryptjs.compare(credentials.password, teacher.password);
            if (isPasswordCorrect) {
                validUser = teacher;
            }
          }
          if (validUser) {
            return validUser;
          } else {
            throw new Error("Incorrect password");
          }
        } catch (error: any) {
          throw new Error(error.message);
        }
      },
    }),
  ],
  pages: {
    signIn: `/sign-in`,
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      // Add additional properties to the token
      if (user) {
        token._id = user._id?.toString();
        token.isVerified = user.isVerified;
        token.role = user.role;
        token.username = user.username;
      }
      console.log(token);
      return token;
      
    },
    async session({ session, token }) {
      if (token) {
        session.user._id = token._id;
        session.user.isVerified = token.isVerified;
        session.user.role = token.role;
        session.user.username = token.username;
      }
      console.log("session  = " +session);
      
      return session;
    },
    
  },
  secret: process.env.NEXTAUTH_SECRET,
};
