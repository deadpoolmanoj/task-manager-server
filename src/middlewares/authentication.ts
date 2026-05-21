import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import { failure, success } from "../shared/api-responses";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeaders = req.headers.authorization;
   
    if (!authHeaders || !authHeaders.startsWith("Bearer")) {
        return res.status(401).json({ error: "No token provided" })
    }

    const token = authHeaders.split(' ')[1];

    try {
        const decodedUser = jwt.verify(token, process.env.JWT_SECRET!);
        (req as any).user = decodedUser
        next()
    } catch {
        res.status(401).json(failure("Validation Error"))
    }
} 