import { Response, Request } from "express";
import { addNewUser, editExistingUser, deleteExistingUser, fetchAllUsers } from "./service";
import { HTTP_STATUS, NOT_FOUND, UN_AUTHORIZED, USER_ALREADY_EXISTS } from "../../shared/status-codes";
import { failure, success } from "../../shared/api-responses";
import { User } from "../../shared/types/user";

export const getUsers = async (req: any, res: Response) => {
    try {
        const userId = req.user.id
        const data = await fetchAllUsers(userId)
        return res.status(HTTP_STATUS.OK).json(success(data));
    } catch (err: any) {
        if (err.message === UN_AUTHORIZED) return res.status(HTTP_STATUS.FORBIDDEN).json(failure(err.message))
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(failure(err.message))
    }
}


export const addUser = async (req: any, res: Response) => {
    try {
        const reqUser = req.body as User
        reqUser.adminId = req.user.id;
        const user = await addNewUser(reqUser);
        return res.status(HTTP_STATUS.CREATED).json(success(user, "User added successfully"))
    } catch (err: any) {
        if (err.message === UN_AUTHORIZED)          return res.status(HTTP_STATUS.FORBIDDEN).json(failure(err.message))
        if (err.message === USER_ALREADY_EXISTS) return res.status(HTTP_STATUS.CONFLICT).json(failure(err.message))  
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(failure(err.message))
    }
}

export const editUser = async (req: any, res: Response) => {
    try {
        const reqUser = req.body as User
        reqUser.adminId = req.user.id;
        const user = await editExistingUser(reqUser)
        return res.status(HTTP_STATUS.OK).json(success(user, "User edited successfully"))
    } catch (err: any) {
        if (err.message === UN_AUTHORIZED)      return res.status(HTTP_STATUS.FORBIDDEN).json(failure(err.message))
        if (err.message === NOT_FOUND)  return res.status(HTTP_STATUS.NOT_FOUND).json(failure(err.message))
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(failure(err.message))
    }
}

export const deleteUser = async (req: any, res: Response) => {
    try {
        const userToBeDeletedId = Number(req.params.userId) 
        if (isNaN(userToBeDeletedId)) return res.status(HTTP_STATUS.BAD_REQUEST).json(failure('Invalid user ID'))
        const adminUserId = req.user.id;

        await deleteExistingUser(userToBeDeletedId, adminUserId)
        return res.status(HTTP_STATUS.OK).json(success({}, "User Deleted Successfully"))
    } catch (err: any) {
        if (err.message === UN_AUTHORIZED)      return res.status(HTTP_STATUS.FORBIDDEN).json(failure(err.message))
        if (err.message === NOT_FOUND)  return res.status(HTTP_STATUS.NOT_FOUND).json(failure(err.message))
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(failure(err.message))
    }
}