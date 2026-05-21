import type { ZodSchema } from "zod";
import { NextFunction, Request, Response } from 'express'
import { registerScheme } from "../modules/auth/validation";
import { HTTP_STATUS } from "../shared/status-codes";
import { failure } from "../shared/api-responses";

export const validate = (schema: ZodSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = schema.safeParse(req.body);

            if (!result.success) {
                return res.status(HTTP_STATUS.BAD_REQUEST).json(failure(result.error.issues[0]?.message || "Validation error"));
            }
            req.body = result.data;
            next();
        } catch (error) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json(failure("Validation error"));
        }
    }
}