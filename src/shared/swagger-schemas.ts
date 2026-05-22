/**
 * @openapi
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     SuccessResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: Success
 *         data:
 *           type: object
 *     FailureResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         message:
 *           type: string
 *           example: Something went wrong
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           example: 42
 *         text:
 *           type: string
 *           example: Buy groceries
 *         description:
 *           type: string
 *           example: From the supermarket
 *         isCompleted:
 *           type: boolean
 *           example: false
 *     TaskCreateInput:
 *       type: object
 *       required: [text]
 *       properties:
 *         text:
 *           type: string
 *           example: Buy groceries
 *         description:
 *           type: string
 *           example: From the supermarket
 *     TaskEditInput:
 *       type: object
 *       required: [id, text]
 *       properties:
 *         id:
 *           type: number
 *           example: 42
 *         text:
 *           type: string
 *           example: Buy groceries
 *         description:
 *           type: string
 *           example: From the supermarket
 *         isCompleted:
 *           type: boolean
 *           example: false
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           nullable: true
 *           example: 1
 *         name:
 *           type: string
 *           example: "Manoj Naik"
 *         email:
 *           type: string
 *           format: email
 *           example: "manoj@example.com"
 *         role:
 *           type: string
 *           enum: [user, admin]
 *           example: "user"
 *     UserCreateInput:
 *       type: object
 *       required: [name, email, password, role]
 *       properties:
 *         name:
 *           type: string
 *           minLength: 2
 *           example: "Kunjal Salvi"
 *         email:
 *           type: string
 *           format: email
 *           example: "kunjal@example.com"
 *         password:
 *           type: string
 *           minLength: 8
 *           example: "Secret123"
 *         role:
 *           type: string
 *           enum: [user, admin]
 *           example: "user"
 *     UserEditInput:
 *       type: object
 *       required: [name, email, password, role]
 *       properties:
 *         id:
 *           type: integer
 *           nullable: false
 *           example: 123
 *         name:
 *           type: string
 *           minLength: 2
 *           example: "Jimmy"
 *         email:
 *           type: string
 *           format: email
 *           example: "jimmy@example.com"
 *         password:
 *           type: string
 *           minLength: 8
 *           example: "Secret123"
 *         role:
 *           type: string
 *           enum: [user, admin]
 *           example: "user"
 */