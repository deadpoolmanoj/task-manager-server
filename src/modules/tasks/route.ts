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
 *     description: |
 *       Retrieves all tasks belonging to the authenticated user.
 *       - Returns an empty array if the user has no tasks
 *       - Tasks are ordered by id ascending
 *       - text, isCompleted and description are returned per task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of tasks retrieved successfully
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
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FailureResponse'
 */
router.get('/', getTasks)

/**
 * @openapi
 * /api/v1/tasks:
 *   post:
 *     summary: Add a new task
 *     description: |
 *       Creates a new task for the authenticated user.
 *       - userId is extracted from the JWT token
 *       - text and description are sanitized before storing
 *       - isCompleted is set to false by default
 *       - Returns the created task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TaskCreateInput'
 *     responses:
 *       200:
 *         description: Task added successfully
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
 *                   example: Task added successfully
 *                 data:
 *                   $ref: '#/components/schemas/Task'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FailureResponse'
 */
router.post('/', validate(taskSchema), addTask)

/**
 * @openapi
 * /api/v1/tasks:
 *   put:
 *     summary: Edit an existing task
 *     description: |
 *       Updates an existing task after verifying ownership.
 *       - Returns 404 if the task does not exist
 *       - Returns 403 if the task belongs to a different user
 *       - text and description are sanitized before storing
 *       - Returns the updated task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TaskEditInput'
 *     responses:
 *       200:
 *         description: Task edited successfully
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
 *                   example: Task edited successsfully
 *                 data:
 *                   $ref: '#/components/schemas/Task'
 *       403:
 *         description: Forbidden - task belongs to a different user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FailureResponse'
 *       404:
 *         description: Task not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FailureResponse'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FailureResponse'
 */
router.put('/', validate(taskSchema), editTask)

/**
 * @openapi
 * /api/v1/tasks/{taskId}:
 *   delete:
 *     summary: Delete a task
 *     description: |
 *       Deletes a task by its ID after verifying ownership.
 *       - Returns 400 if taskId in the path is not a valid number
 *       - Returns 404 if the task does not exist
 *       - Returns 403 if the task belongs to a different user
 *       - Returns empty object as data on success
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Task deleted successfully
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
 *                   example: Task Deleted Successfully
 *                 data:
 *                   type: object
 *                   example: {}
 *       400:
 *         description: Bad request - taskId is not a valid number
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FailureResponse'
 *       403:
 *         description: Forbidden - task belongs to a different user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FailureResponse'
 *       404:
 *         description: Task not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FailureResponse'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FailureResponse'
 */
router.delete('/:taskId', deleteTask)

export default router;