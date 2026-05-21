import { Request, Response } from 'express'
import { createUser, generateToken, verifyCredentials } from './service';
import { User } from '../../shared/types/user';
import { HTTP_STATUS } from '../../shared/status-codes';
import { failure, success } from '../../shared/api-responses';

export const registerUser = async (req: any, res: Response) => {
    try {
        const newUser = req.body as User
        const user = await createUser(newUser)
        const token = generateToken(user)
        res.status(HTTP_STATUS.CREATED).json(success({
            token,
            user: {
                id: user.id,
                role: user.role,
            }
        }, "Account Created"))
    } catch (err: any) {
        res.status(HTTP_STATUS.BAD_REQUEST).json(failure(err.message))
    }
}

export const loginUser = async (req: any, res: Response) => {
    try {
        const reqUser = req.body as User
        const user = await verifyCredentials(reqUser);
        const token = generateToken(user);
        res.status(HTTP_STATUS.ACCEPTED).json(success({
            token,
            user: {
                id: user.id,
                role: user.role,
            }
        }, "Logges In!"))
    } catch (err: any) {
        res.status(HTTP_STATUS.BAD_REQUEST).json(failure(err.message))
    }
}