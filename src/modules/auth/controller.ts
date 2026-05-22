import { Request, Response } from 'express'
import { createUser, generateRefreshToken, generateToken, getUserById, verifyCredentials } from './service';
import { User } from '../../shared/types/user';
import { HTTP_STATUS } from '../../shared/status-codes';
import { failure, success } from '../../shared/api-responses';
import jwt from 'jsonwebtoken'

const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict' as const,
    maxAge: 30 * 24 * 60 * 60 * 1000  // 30 days
}

export const registerUser = async (req: any, res: Response) => {
    try {
        const newUser = req.body as User
        const user = await createUser(newUser)
        const accessToken = generateToken(user)
        const refreshToken = generateRefreshToken(user)
        res.cookie('refreshToken', refreshToken, COOKIE_OPTIONS)
        res.status(HTTP_STATUS.CREATED).json(success({
            accessToken,
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
        const accessToken = generateToken(user)
        const refreshToken = generateRefreshToken(user)

        res.cookie('refreshToken', refreshToken, COOKIE_OPTIONS)
        res.status(HTTP_STATUS.ACCEPTED).json(success({
            accessToken,
            user: { id: user.id, role: user.role }
        }, "Logged In!"))
    } catch (err: any) {
        res.status(HTTP_STATUS.BAD_REQUEST).json(failure(err.message))
    }
}

export const getMe = async (req: any, res: Response) => {
    try {
        // check cookie first, fall back to header for Swagger testing
        let refreshToken = req.cookies?.refreshToken

        // temporary Swagger fallback — remove in production
        if (!refreshToken && req.headers['x-refresh-token']) {
            refreshToken = req.headers['x-refresh-token']
        }

        if (!refreshToken) return res.status(HTTP_STATUS.UNAUTHORIZED).json(failure("No refresh token"))

        const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!) as { id: number }
        const user = await getUserById(payload.id)
        const accessToken = generateToken(user)

        res.status(HTTP_STATUS.OK).json(success({
            accessToken,
            user: { id: user.id, role: user.role }
        }, "Authenticated"))
    } catch (err: any) {
        return res.status(HTTP_STATUS.UNAUTHORIZED).json(failure("Invalid or expired refresh token"))
    }
}

export const logoutUser = async (req: any, res: Response) => {
    res.clearCookie('refreshToken', COOKIE_OPTIONS)
    res.status(HTTP_STATUS.OK).json(success({}, "Logged out"))
}