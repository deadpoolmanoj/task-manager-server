import { email, z } from 'zod'

export const userSchema = z.object({
    id: z.number().optional(),
    name: z.string().trim().min(2, "Name should be atleast 2 charecter!"),
    email: z.string().trim().email("Enter a valid email address"),
    password: z.string()
        .min(8, "Password must be at least 8 characters.")
        .refine((val) => /[A-Z]/.test(val), {
            message: "Password must contain at least one uppercase letter.",
        })
        .refine((val) => /[0-9]/.test(val), {
            message: "Password must contain at least one number.",
        }),
    role: z.enum(['user', 'admin']),
    adminId: z.number().nullable()
})
