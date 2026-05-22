import bcrypt from "bcryptjs";
import { supabase } from "../../config/supabase";
import { User } from "../../shared/types/user";
import { HASHING_SALT } from "../../shared/allConstants";
import { sanitizeContent } from "../../utils/sanitize";
import { NOT_FOUND, UN_AUTHORIZED, USER_ALREADY_EXISTS } from "../../shared/status-codes";

const userSelectionString = 'id, name, email, role' 

const checkIfUserIsAdmin = async (userId: number) => {
    const { data, error } = await supabase
        .from('User')
        .select('role')
        .eq('id', userId)
        .single()

    if (error || !data) return false;

    return data.role === 'admin'
}

export const fetchAllUsers = async (userId: number) => {
    const isUserAdmin = await checkIfUserIsAdmin(userId)

    if (!isUserAdmin) throw new Error(UN_AUTHORIZED);

    const { data, error } = await supabase
        .from('User')
        .select(userSelectionString)
        .order("id", { ascending: true })

    if (error) throw new Error(error.message);

    return data as User[]
}

export const addNewUser = async (user: User) => {
    const isUserAdmin = await checkIfUserIsAdmin(user.adminId);

    if (!isUserAdmin) throw new Error(UN_AUTHORIZED);

    const { data: existingUser } = await supabase
        .from('User')
        .select("id")
        .eq('email', user.email)
        .single()

    if (existingUser) throw new Error(USER_ALREADY_EXISTS)

    const hashedPassword = await bcrypt.hash(user.password, HASHING_SALT);
    const cleanName = sanitizeContent(user.name);
    const cleanRole = sanitizeContent(user.role);

    const { data, error } = await supabase
        .from('User')
        .insert([{ name: cleanName, email: user.email, password: hashedPassword, role: cleanRole }])
        .select(userSelectionString)
        .single()

    if (error) throw new Error(error.message);

    return data as User
}

export const editExistingUser = async (user: User) => {
    const isUserAdmin = await checkIfUserIsAdmin(user.adminId)

    if (!isUserAdmin) throw new Error(UN_AUTHORIZED);

    const { data: existingUser } = await supabase
        .from('User')
        .select('id')
        .eq('id', user.id)
        .maybeSingle()

    if (!existingUser) throw new Error(NOT_FOUND)

    const hashedPassword = await bcrypt.hash(user.password, HASHING_SALT);
    const cleanName = sanitizeContent(user.name);
    const cleanRole = sanitizeContent(user.role);

    const { data, error } = await supabase
        .from('User')
        .update({ name: cleanName, email: user.email, password: hashedPassword, role: cleanRole })
        .eq('id', user.id)
        .select(userSelectionString)
        .single()

    if (error) throw new Error(error.message);

    return data as User
}

export const deleteExistingUser = async (userToBeDeletedId: number, adminId: number) => {
    const isUserAdmin = await checkIfUserIsAdmin(adminId)

    if (!isUserAdmin) throw new Error(UN_AUTHORIZED);

    const { data: existingUser } = await supabase
        .from('User')
        .select('id')
        .eq('id', userToBeDeletedId)
        .maybeSingle()

    if (!existingUser) throw new Error(NOT_FOUND)

    const { error } = await supabase
        .from('User')
        .delete()
        .eq('id', userToBeDeletedId)

    if (error) throw new Error(error.message);
}