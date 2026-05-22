import { supabase } from "../../config/supabase";
import { Task } from "../../shared/types/task";
import { sanitizeContent } from "../../utils/sanitize";

const taskSelectionString = 'id, text, description'

export const fetchAllTasks = async (userId: number) => {
    const { data, error } = await supabase
        .from('Task')
        .select(taskSelectionString)
        .eq('user_id', userId)
        .order("id", { ascending: true })

    if (error) throw new Error(error.message);

    return data as Task[]
}

export const addNewTask = async (task: Task) => {

    const cleanText = sanitizeContent(task.text);
    const cleanDesc = sanitizeContent(task.description || '');

    const { data, error } = await supabase
        .from('Task')
        .insert([{ text: cleanText, user_id: task.userId, description: cleanDesc }])
        .select(taskSelectionString)
        .single()

    if (error) throw new Error(error.message);

    return data as Task
}

export const editExistingTask = async (task: Task, userId: number) => {

    const { data: existing, error: fetchError } = await supabase
        .from('Task')
        .select('id, user_id')
        .eq('id', task.id)
        .maybeSingle()

    if (fetchError) throw new Error(fetchError.message);
    if (!existing) throw new Error('Task not found!');
    if (existing.user_id !== userId) throw new Error('Unauthorized!');

    const cleanText = sanitizeContent(task.text);
    const cleanDesc = sanitizeContent(task.description || '');

    const { data, error } = await supabase
        .from('Task')
        .update({ text: cleanText, description: cleanDesc })
        .eq('id', task.id)
        .select(taskSelectionString)
        .maybeSingle()

    if (error) throw new Error(error.message);
    return data as Task
}

export const deleteExistingTask = async (taskId: number, userId: number) => {
    const { data: task, error: fetchError } = await supabase
        .from('Task')
        .select('id, user_id')
        .eq('id', taskId)
        .maybeSingle()

    if (fetchError) throw new Error(fetchError.message);
    if (!task) throw new Error('Task not found!');
    if (task.user_id !== userId) throw new Error('Unauthorized!');

    const { data, error } = await supabase
        .from('Task')
        .delete()
        .eq('id', taskId)

    if (error) throw new Error(error.message);
}