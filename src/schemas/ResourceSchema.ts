
import { z } from "zod"

export const ResourseSchema = z.object({
    content: z
        .string()
        .min(10, 'content must be atleast of 10 character ')
        .max(3000,'content must be atmost of 300 character '),
})