import { Router } from 'express'
import { addUser, deleteUser, editUser, getUsers } from './controller';
import { validate } from '../../middlewares/validate';
import { userSchema } from './validation';

const router = Router();

router.get('/', getUsers)

router.post('/', validate(userSchema),  addUser)

router.put('/:id', validate(userSchema), editUser)

router.delete('/:id', deleteUser)

export default router;