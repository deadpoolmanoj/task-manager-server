import { z } from 'zod'

export const registerScheme = z.object({
    name: z.string().min(2, "Name must be atleast 2 charecters"),
    email: z.string().email("Invalid Email"),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .regex(/[A-Z]/, "Must contain one uppercase letter")
        .regex(/[0-9]/, "Must contain one number"),
    role: z.enum(["user", "admin"]).default("user"),
})

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1, "Password is required"),
});