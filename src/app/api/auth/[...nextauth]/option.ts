// // option of sigin as google github

// import { NextAuthOptions } from "next-auth";

// import { dbconnect } from "@/lib/dbconnect";
// import UserModel from "@/model/student";
// import bcryptjs from "bcryptjs";
// import CredentialProvider from "next-auth/providers/credentials";

// export const authOptions: NextAuthOptions = {
//     providers: [
//         CredentialProvider({
//             id: "domain-login",
//             name: "Credentials",
//             credentials: {
//                 username: { label: "Email", type: "text", placeholder: "shreyansh" },
//                 password:{label:"Password",type:"password"}
//             },
//             async authorize(credentials: any): Promise<any>{
//                 await dbconnect();
//                 try {
//                     const user = await UserModel.findOne({
//                         $or: [
//                             {username:credentials.identifier}
//                         ]
//                     })
//                     if (!user) {
//                         throw new Error("no user found with this email")
                        
//                     }
//                     if (!user.isverifiedd) {
//                         throw new Error("Please verify first before  login first")
//                     }
//                     const isPasswordCorrect = await bcryptjs.compare(credentials.password, user.password)
                    
//                     if (isPasswordCorrect) {
//                         return user;
//                     }
//                     else {
//                         throw new Error("Incorrect password")
//                     }
//                 } catch (error:any) {
//                     throw new Error(error);
//                 }
                
//             }
//         })],
//         pages: {
//             signIn: '/sign-in',
//     },
//     session: {
//             strategy:'jwt'
//     },
//     callbacks: {
//         async session({ session, token }) {
//             if (token) {
//                 session.user._id = token._id;
//                 session.user.isVerified = token.isVerified;
//                 session.user.isAcceptingMessages = token.isAcceptingMessages;
//                 session.user.username = token.username;
//             }
//             return session
//         },
//         async jwt({ token, user }) {
//             // modify token so that we can do anythingnusing token not by uerying agin and aigin to database
//             if (user) {
//                 token._id = user._id?.toString()
//                 token.isVerified = user.isVerified;
//                 token.isAcceptingMessages = user.isAcceptingMessages;
//                 token.username = user.username;
//             }
//             return token
//         },
//     },
//     secret:process.env.NEXTAUTH_SECERET
    
// }
import { dbconnect } from "@/lib/dbconnect";
import StudentModel from "@/model/student";
import TeacherModel from "@/model/teacher";
import bcryptjs from "bcryptjs";
import { NextAuthOptions } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    // Google provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    // GitHub provider
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
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
    signIn: '/sign-in',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user._id = token._id;
        session.user.isVerified = token.isVerified;
        session.user.role = token.role;
        session.user.username = token.username;
      }
      return session;
    },
    async jwt({ token, user }) {
      // Add additional properties to the token
      if (user) {
        token._id = user._id?.toString();
        token.isVerified = user.isVerified;
        token.role = user.role;
        token.username = user.username;
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
