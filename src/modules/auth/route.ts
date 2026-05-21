import { Router } from 'express';
import { validate } from '../../middlewares/validate';
import { loginSchema, registerScheme } from './validation';
import { loginUser, registerUser } from './controller';

const router = Router();

router.post("/register", validate(registerScheme), registerUser)

router.post("/login", validate(loginSchema), loginUser)

export default router;