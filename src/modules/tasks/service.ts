import { supabase } from "../../config/supabase";
import { Task } from "../../shared/types/task";

export const fetchAllTasks = async (userId: number) => {
    const { data, error } = await supabase
        .from('Task')
        .select('*')
        .eq('user_id', userId)
        .order("id", { ascending: true })

    if (error) throw new Error(error.message);
    return data as Task[]
}

export const addNewTask = async (task: Task) => {
    const { data, error } = await supabase
        .from('Task')
        .insert([{ text: task.text, user_id: task.userId, is_completed: false, description: task.description }])
        .select("id, text, isCompleted : is_completed, description")
        .single()

    if (error) { 
        throw new Error(error.message);
    }

    return data as Task
}

export const editExistingTask = async (task: Task) => {
    console.log('from service');
    
    const { data, error } = await supabase
        .from('Task')
        .update({ text: task.text, is_completed: task.isCompleted, description: task.description })
        .eq('id', task.id)
        .select("id, text, isCompleted : is_completed, description")
        .single()

    if (error) throw new Error(error.message);

    return data as Task
}

export const deleteExistingTask = async (taskId: number) => {
    const { data, error } = await supabase
        .from('Task')
        .delete()
        .eq('id', taskId)

    if (error) throw new Error(error.message);
}