import { z } from 'zod';

export const signUpSchema = z.object({
  username: z
    .string()
    .min(2, "Username must be at least 2 characters")
    .max(20, "Username must be at most 20 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Username must not contain special characters"),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  role: z.enum(['teacher', 'student']),
  classes: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.role === 'student' && !data.classes) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Class is required for students",
      path: ['classes'],
    });
  }
});
