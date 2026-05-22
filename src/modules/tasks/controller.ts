import { Response, Request } from "express";
import { addNewTask, deleteExistingTask, editExistingTask, fetchAllTasks } from "./service";
import { HTTP_STATUS } from "../../shared/status-codes";
import { failure, success } from "../../shared/api-responses";
import { Task } from "../../shared/types/task";

export const getTasks = async (req: any, res: Response) => {
    try {
        const userId = req.user.id
        const data = await fetchAllTasks(userId)
        return res.status(HTTP_STATUS.OK).json(success(data));
    } catch (err: any) {
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(failure(err.message))
    }
}

export const addTask = async (req: any, res: Response) => {
    try {
        const reqTask = req.body as Task;
        reqTask.userId = req.user.id;
        const task = await addNewTask(reqTask);
        return res.status(HTTP_STATUS.OK).json(success(task, "Task added successfully"))
    } catch (err: any) {
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(failure(err.message))
    }
}

export const editTask = async (req: any, res: Response) => {
    try {
        const reqTask = req.body as Task
        const userId = req.user.id;
        const task = await editExistingTask(reqTask, userId)
        return res.status(HTTP_STATUS.OK).json(success(task, "Task edited successsfully"))
    } catch (err: any) {
        if (err.message === 'Task not found!') return res.status(HTTP_STATUS.NOT_FOUND).json(failure(err.message))
        if (err.message === 'Unauthorized!') return res.status(HTTP_STATUS.FORBIDDEN).json(failure(err.message))
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(failure(err.message))
    }
}

export const deleteTask = async (req: any, res: Response) => {
    try {
        const taskId = Number(req.params.taskId)
        if (isNaN(taskId)) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json(failure('Invalid task ID')) 
        }
        const userId = req.user.id;
        await deleteExistingTask(taskId, userId)
        return res.status(HTTP_STATUS.OK).json(success({}, "Task Deleted Successfully"))
    } catch (err: any) {
        if (err.message === 'Task not found!') return res.status(HTTP_STATUS.NOT_FOUND).json(failure(err.message))
        if (err.message === 'Unauthorized!') return res.status(HTTP_STATUS.FORBIDDEN).json(failure(err.message))
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(failure(err.message))
    }
}