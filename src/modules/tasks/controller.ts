import { Response, Request } from "express";
import { addNewTask, deleteExistingTask, editExistingTask, fetchAllTasks } from "./service";
import { HTTP_STATUS } from "../../shared/status-codes";
import { failure, success } from "../../shared/api-responses";
import { Task } from "../../shared/types/task";

export const getTasks = async (req: any, res: Response) => {
    try {
        const userId = req.query.userId
        const data = await fetchAllTasks(userId)
        return res.status(HTTP_STATUS.OK).json(success(data));
    } catch (err: any) {
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(failure(err.message))
    }
}

export const addTask = async (req: any, res: Response) => {
    try {
        const reqTask = req.body as Task
        const task = await addNewTask(reqTask);
        return res.status(HTTP_STATUS.CREATED).json(success(task, "Task added successfully"))
    } catch (err: any) {
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(failure(err.message))
    }
}

export const editTask = async (req: any, res: Response) => {
    try { 
        const reqTask = req.body as Task
        const task = await editExistingTask(reqTask)
        return res.status(HTTP_STATUS.OK).json(success(task, "Task edited successsfully"))
    } catch (err: any) {
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(failure(err.message))
    }
}

export const deleteTask = async (req: Request, res: Response) => {
    try {
        const reqTask = req.body as Task
        await deleteExistingTask(reqTask)
        return res.status(HTTP_STATUS.OK).json(success({}, "Task Deleted Successfully"))
    } catch (err: any) {
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(failure(err.message))
    }
}