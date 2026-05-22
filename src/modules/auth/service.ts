import bcrypt from "bcryptjs";
import { supabase } from "../../config/supabase";
import { User } from "../../shared/types/user";
import { HASHING_SALT } from "../../shared/allConstants";
import jwt from 'jsonwebtoken'
import { sanitizeContent } from "../../utils/sanitize";


export const createUser = async (user: User) => {
    const { data: existing } = await supabase
        .from("User")
        .select("id")
        .eq("email", user.email)
        .single()

    if (existing) throw new Error("User already exists")

    const hashedPassword = await bcrypt.hash(user.password, HASHING_SALT);

    const cleanName = sanitizeContent(user.name);
    const cleanEmail = user.email.toLowerCase().trim();

    const { data, error } = await supabase
        .from('User')
        .insert([{ name: cleanName, email: cleanEmail, password: hashedPassword, role: 'user' }])
        .select("id, role")
        .single()

    if (error) throw new Error(error.message);

    return data as User
}

export const verifyCredentials = async (user: User) => {
    const { data: existingUser, error } = await supabase
        .from("User")
        .select("*")
        .eq("email", user.email)
        .single();

    const errMsg = "Invalid email or password"

    if (error || !existingUser) throw new Error(errMsg);

    const valid = await bcrypt.compare(user.password, existingUser.password);

    if (!valid) throw new Error(errMsg);

    return existingUser as User;
}

export const getUserById = async (id: number) => {
    const { data: user, error } = await supabase
        .from('User')
        .select('id, role, email')
        .eq('id', id)
        .single()

    if (error || !user) throw new Error("User not found")

    return user as User
}

export const generateToken = (user: User) => {
    return jwt.sign(
        {
            id: user.id,
            email: user.email,
            role: user.role,
        },
        process.env.JWT_SECRET!,
        { expiresIn: '7d' }
    )
}

export const generateRefreshToken = (user: User) => {
    return jwt.sign(
        { id: user.id },
        process.env.JWT_REFRESH_SECRET!,
        { expiresIn: '30d' }
    )
}