
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
      id: "credentials",
      name: "Credentials",
      credentials: {
        username: { label: "Email", type: "text"},
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any): Promise<any> {
        await dbconnect();
        try {
          // console.log("Received credentials:", credentials);
    
          const user = await StudentModel.findOne({
            $or: [
              { username: credentials.identifier },
              {email:credentials.identifier}
            ],
          
          });
          const teacher = await TeacherModel.findOne({
            $or: [
              { username: credentials.identifier },
              { email: credentials.identifier }
            ],
          });

          if (!user && !teacher) {
            throw new Error("No user found with this email");
          }

          let validUser = null;
          if (user) {
            if (!user.isverified) {
              throw new Error("Please verify your account before logging in student");
            }
            const isPasswordCorrect = await bcryptjs.compare(credentials.password, user.password);
            if (isPasswordCorrect) {
              validUser = user;
            }
          }
          if (teacher ) {
            if (!teacher.isVerified) {
              throw new Error("Please verify your account before logging in teacher ");
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
      // console.log(token.isVerified);
      return token;
      
    },
    async session({ session, token }) {
      // console.log('Session:', session);
    // console.log('Token:', token);
      if (token) {
        session.user._id = token._id;
        session.user.isVerified = token.isVerified;
        session.user.role = token.role;
        session.user.username = token.username;
      }
      // console.log("session  = " + session.user);
      
      return session;
    },
    // async redirect({ url, baseUrl }) {
    //  console.log('Redirect URL:', url);
    // console.log('Base URL:', baseUrl);

    // const session = await getSession();
    // console.log('Session:', session);
    
      // if (session?.user?.username) {
      //   return `${baseUrl}/${session.user.username}/profile`;
      // }

      // Default to home if username is not available
      // return baseUrl;
    // },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
