import { z } from 'zod'

export const taskSchema = z.object({
    id: z.number(),
    text: z.string().min(3, "Task Title should be atleast 3 charecter!"),
    description: z.string(),
    isCompleted: z.boolean().optional(),
    userId: z.number()
})

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1, "Password is required"),
});