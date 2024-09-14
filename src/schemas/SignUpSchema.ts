import { z } from 'zod'

export const usernameValidation = z
    .string()
    .min(2, "Username must be atleast 2 charcaters")
    .max(20, "Usernaem must be at most 20 character")
    .regex(/^[a-zA-Z0-9_]+$/, "Usrname must not conatain special cahracter ")

export const classvalidation = z.string()
    .min(1, "Class must be grater than first class")
    .max(12, "At most class is 12th")
    
export const signUpSchema = z.object({
    username: usernameValidation,
    email: z.string().email({message:'Invalid email address'}),
    password: z.string().min(6, { message: "password must be atleast 6 character" }),
    classes:classvalidation,
})

