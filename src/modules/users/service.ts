import bcrypt from "bcryptjs";
import { supabase } from "../../config/supabase";
import { User } from "../../shared/types/user";
import { HASHING_SALT } from "../../shared/allConstants";
import { sanitizeContent } from "../../utils/sanitize";

const checkIfUserIsAdmin = async (userId: number) => {
    const { data, error } = await supabase
        .from('User')
        .select('role')
        .eq('id', userId)
        .single()

    if (error || !data) {
        return false;
    }

    return data.role === 'admin'
}

export const fetchAllUsers = async (userId: number) => {

    const isUserAdmin = await checkIfUserIsAdmin(userId)

    if (!isUserAdmin) throw new Error('Not Authorized');

    const { data, error } = await supabase
        .from('User')
        .select('id, name, email, role')
        .order("id", { ascending: true })

    if (error) throw new Error(error.message);

    return data as User[]
}

export const addNewUser = async (user: User) => {
    const isUserAdmin = await checkIfUserIsAdmin(user.adminId)

    if (!isUserAdmin) throw new Error('Not Authorized');

    // checking if user already exists 
    const { data: existingUser } = await supabase
        .from('User')
        .select("id")
        .eq('email', user.email)
        .single()

    if (existingUser) throw new Error('User already exists!')
    
    const hashedPassword = await bcrypt.hash(user.password, HASHING_SALT);

    const cleanName = sanitizeContent(user.name);

    const cleanRole = sanitizeContent(user.role);

    const { data, error } = await supabase
        .from('User')
        .insert([{ name: cleanName, email: user.email, password: hashedPassword, role: cleanRole }])
        .select("id, name, email, role")
        .single()

    if (error) {
        throw new Error(error.message);
    }

    return data as User
}

export const editExistingUser = async (user: User) => {

    const isUserAdmin = await checkIfUserIsAdmin(user.adminId)

    if (!isUserAdmin) throw new Error('Not Authorized');

    const hashedPassword = await bcrypt.hash(user.password, HASHING_SALT);

    const cleanName = sanitizeContent(user.name);

    const cleanRole = sanitizeContent(user.role);

    const { data, error } = await supabase
        .from('User')
        .update({ name: cleanName, email: user.email, password: hashedPassword, role: cleanRole })
        .eq('id', user.id)
        .select("id, name, email, role")
        .single()

    if (error) throw new Error(error.message);

    return data as User
}

export const deleteExistingUser = async (user: User) => {
console.log(user);

    const isUserAdmin = await checkIfUserIsAdmin(user.adminId)

    if (!isUserAdmin) throw new Error('Not Authorized');

    const { data, error } = await supabase
        .from('User')
        .delete()
        .eq('id', user.id)

    if (error) throw new Error(error.message);
}