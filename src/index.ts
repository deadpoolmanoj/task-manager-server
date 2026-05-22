import express, { text } from "express";
import { login, register } from "./auth/controller";
import cors from 'cors';
import rateLimit from "express-rate-limit";
import { authMiddleware } from "./middlewares/authentication";
import authRoutes from './modules/auth/route'
import tasksRoutes from './modules/tasks/route'
import usersRoutes from './modules/users/route'
import dotenv from 'dotenv'
import { rateLimiter } from './middlewares/roleRateLimiter'
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";
import cookieParser from 'cookie-parser'

dotenv.config()

const app = express();

app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(
    cors({
        origin: process.env.CLIENT_URL,
        credentials: true,
    })
);

app.use(express.json());

app.use(cookieParser());

app.use(rateLimiter) // requests set 100 per 15 mins

app.use('/api/v1/auth', authRoutes)

app.use('/api/v1/tasks', authMiddleware, tasksRoutes)

app.use('/api/v1/users', authMiddleware, usersRoutes)

app.listen(Number(process.env.PORT), '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${process.env.PORT}`);
});