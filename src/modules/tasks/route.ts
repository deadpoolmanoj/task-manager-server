// import { Router } from 'express'
// import { addTask, deleteTask, editTask, getTasks } from './controller';
// import { deleteExistingTask, editExistingTask } from './service';
// import { validate } from '../../middlewares/validate';
// import { taskSchema } from './validation';

// const router = Router();

// router.get('/', getTasks)

// router.post('/:id',  validate(taskSchema), addTask)

// router.put('/:id', validate(taskSchema), editTask)

// router.delete('/:id', deleteTask)

// export default router;

import { Router } from 'express'
import { addTask, deleteTask, editTask, getTasks } from './controller';
import { validate } from '../../middlewares/validate';
import { taskSchema } from './validation';

const router = Router();

/**
 * @openapi
 * /api/v1/tasks:
 *   get:
 *     summary: Get all tasks for a user
 *     tags: [Tasks]
 *     parameters:
 *       - in: query
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Success
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Task'
 *       500:
 *         description: Server error
 */
router.get('/', getTasks)

/**
 * @openapi
 * /api/v1/tasks/{id}:
 *   post:
 *     summary: Add a new task
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TaskInput'
 *     responses:
 *       201:
 *         description: Task created
 *       500:
 *         description: Server error
 */
router.post('/:id', validate(taskSchema), addTask)

/**
 * @openapi
 * /api/v1/tasks/{id}:
 *   put:
 *     summary: Edit an existing task
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TaskInput'
 *     responses:
 *       200:
 *         description: Task updated
 *       500:
 *         description: Server error
 */
router.put('/:id', validate(taskSchema), editTask)

/**
 * @openapi
 * /api/v1/tasks/{id}:
 *   delete:
 *     summary: Delete a task
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task deleted
 *       500:
 *         description: Server error
 */
router.delete('/:id', deleteTask)

export default router;