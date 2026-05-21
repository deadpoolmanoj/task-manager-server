import { Response, Request } from "express";
import { addNewUser, editExistingUser, deleteExistingUser, fetchAllUsers } from "./service";
import { HTTP_STATUS } from "../../shared/status-codes";
import { failure, success } from "../../shared/api-responses";
import { User } from "../../shared/types/user";

export const getUsers = async (req: any, res: Response) => {
    try {
        const userId = req.query.userId
        const data = await fetchAllUsers(userId)
        return res.status(HTTP_STATUS.OK).json(success(data));
    } catch (err: any) {
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(failure(err.message))
    }
}

export const addUser = async (req: any, res: Response) => {
    try {
        const reqUser = req.body as User
        console.log(reqUser);
        
        const user = await addNewUser(reqUser);
        return res.status(HTTP_STATUS.CREATED).json(success(user, "User added successfully"))
    } catch (err: any) { 
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(failure(err.message))
    }
}

export const editUser = async (req: any, res: Response) => {
    try { 
        const reqUser = req.body as User
        console.log(reqUser);
        const user = await editExistingUser(reqUser)
        return res.status(HTTP_STATUS.OK).json(success(user, "User edited successsfully"))
    } catch (err: any) {
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(failure(err.message))
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const reqUser = req.body as User
        await deleteExistingUser(reqUser)
        return res.status(HTTP_STATUS.OK).json(success({}, "User Deleted Successfully"))
    } catch (err: any) {
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(failure(err.message))
    }
}