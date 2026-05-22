import { Router } from 'express';
import { validate } from '../../middlewares/validate';
import { loginSchema, registerScheme } from './validation';
import { getMe, loginUser, logoutUser, registerUser } from './controller';

const router = Router();

/**
 * @openapi
 * /api/v1/auth/register:
 *   post:
 *     summary: Register a new user
 *     description: |
 *       Creates a new user account with role defaulted to 'user'.
 *       - Email is lowercased and trimmed before storing
 *       - Name is sanitized before storing
 *       - Password is hashed before storing
 *       - Sets an HttpOnly refreshToken cookie (30d)
 *       - Returns accessToken and basic user info on success
 *       - Returns 400 if user with the same email already exists
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 minLength: 2
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 minLength: 8
 *                 example: Password1
 *     responses:
 *       201:
 *         description: Account created successfully
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
 *                   example: Account Created
 *                 data:
 *                   type: object
 *                   properties:
 *                     accessToken:
 *                       type: string
 *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                     user:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 1
 *                         role:
 *                           type: string
 *                           enum: [user, admin]
 *                           example: user
 *       400:
 *         description: Bad request - validation error or user already exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FailureResponse'
 */
router.post("/register", validate(registerScheme), registerUser)

/**
 * @openapi
 * /api/v1/auth/login:
 *   post:
 *     summary: Login and get JWT token
 *     description: |
 *       Verifies credentials and returns an accessToken.
 *       - Sets an HttpOnly refreshToken cookie (30d)
 *       - JWT accessToken expires in 7 days
 *       - Token payload contains id, email and role
 *       - Returns 400 for both invalid email and wrong password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 example: Password1
 *     responses:
 *       202:
 *         description: Login successful
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
 *                   example: Logged In!
 *                 data:
 *                   type: object
 *                   properties:
 *                     accessToken:
 *                       type: string
 *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                     user:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 1
 *                         role:
 *                           type: string
 *                           enum: [user, admin]
 *                           example: user
 *       400:
 *         description: Bad request - invalid email or wrong password
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FailureResponse'
 */
router.post("/login", validate(loginSchema), loginUser)

/**
 * @openapi
 * /api/v1/auth/me:
 *   get:
 *     summary: Restore session from refresh token
 *     description: |
 *       Reads the HttpOnly refreshToken cookie and issues a fresh accessToken.
 *       - In production: uses the HttpOnly cookie automatically
 *       - For Swagger testing: paste the refreshToken in the x-refresh-token header below
 *     tags: [Auth]
 *     parameters:
 *       - in: header
 *         name: x-refresh-token
 *         required: false
 *         schema:
 *           type: string
 *         description: Only for Swagger testing — paste your refreshToken here
 *     responses:
 *       200:
 *         description: Session restored successfully
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
 *                   example: Authenticated
 *                 data:
 *                   type: object
 *                   properties:
 *                     accessToken:
 *                       type: string
 *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                     user:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 1
 *                         role:
 *                           type: string
 *                           enum: [user, admin]
 *                           example: user
 *       401:
 *         description: Unauthorized - missing, invalid or expired refresh token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FailureResponse'
 */
router.get("/me", getMe)

/**
 * @openapi
 * /api/v1/auth/logout:
 *   post:
 *     summary: Logout and clear refresh token
 *     description: |
 *       Clears the HttpOnly refreshToken cookie from the browser.
 *       - Frontend should also clear the accessToken from memory on receiving this response
 *       - No Authorization header needed
 *       - Always returns 200 even if no cookie was present
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Logged out successfully
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
 *                   example: Logged out
 *                 data:
 *                   type: object
 *                   example: {}
 */
router.post("/logout", logoutUser)

export default router;