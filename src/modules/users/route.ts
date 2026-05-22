import { Router } from 'express'
import { addUser, deleteUser, editUser, getUsers } from './controller';
import { validate } from '../../middlewares/validate';
import { userSchema } from './validation';

const router = Router();

/**
 * @openapi
 * /api/v1/users:
 *   get:
 *     summary: Get all users
 *     description: |
 *       Fetches all users from the database.
 *       - Only admins can access this route
 *       - Returns 403 if the requester is not an admin
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all users
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
 *                     $ref: '#/components/schemas/User'
 *       403:
 *         description: Forbidden - requester is not an admin
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
router.get('/', getUsers)

/**
 * @openapi
 * /api/v1/users:
 *   post:
 *     summary: Create a new user
 *     description: |
 *       Creates a new user in the database.
 *       - Only admins can create users
 *       - Returns 403 if the requester is not an admin
 *       - Returns 409 if a user with the same email already exists
 *       - Password is hashed before storing
 *       - Name and role are sanitized before storing
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserCreateInput'
 *     responses:
 *       201:
 *         description: User created successfully
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
 *                   example: User added successfully
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       403:
 *         description: Forbidden - requester is not an admin
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FailureResponse'
 *       409:
 *         description: Conflict - user with this email already exists
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
router.post('/', validate(userSchema), addUser)

/**
 * @openapi
 * /api/v1/users:
 *   put:
 *     summary: Update an existing user
 *     description: |
 *       Updates an existing user's details.
 *       - Only admins can edit users
 *       - Returns 403 if the requester is not an admin
 *       - Returns 404 if the user to be edited does not exist
 *       - Password is re-hashed on every update
 *       - Name and role are sanitized before storing
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserEditInput'
 *     responses:
 *       200:
 *         description: User updated successfully
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
 *                   example: User edited successfully
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       403:
 *         description: Forbidden - requester is not an admin
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FailureResponse'
 *       404:
 *         description: User not found
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
router.put('/', validate(userSchema), editUser)

/**
 * @openapi
 * /api/v1/users/{userId}:
 *   delete:
 *     summary: Delete a user
 *     description: |
 *       Deletes a user by their ID.
 *       - Only admins can delete users
 *       - Returns 400 if the userId in the path is not a valid number
 *       - Returns 403 if the requester is not an admin
 *       - Returns 404 if the user to be deleted does not exist
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: User deleted successfully
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
 *                   example: User Deleted Successfully
 *                 data:
 *                   type: object
 *                   example: {}
 *       400:
 *         description: Bad request - userId is not a valid number
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FailureResponse'
 *       403:
 *         description: Forbidden - requester is not an admin
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FailureResponse'
 *       404:
 *         description: User not found
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
router.delete('/:userId', deleteUser)

export default router;