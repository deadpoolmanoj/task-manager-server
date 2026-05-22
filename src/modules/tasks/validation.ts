import { z } from 'zod'

export const taskSchema = z.object({
    id: z.number().optional(),
    text: z.string().min(2, "Task Title should be atleast 2 charecter!"),
    description: z.string(),
    isCompleted: z.boolean().optional(),
    userId: z.number().optional()
})

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1, "Password is required"),
});