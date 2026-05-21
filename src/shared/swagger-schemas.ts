/**
 * @openapi
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         text:
 *           type: string
 *         isCompleted:
 *           type: boolean
 *         description:
 *           type: string
 *     TaskInput:
 *       type: object
 *       required: [text, userId]
 *       properties:
 *         text:
 *           type: string
 *           example: Buy groceries
 *         userId:
 *           type: string
 *           example: "123"
 *         description:
 *           type: string
 *           example: From the supermarket
 *         isCompleted:
 *           type: boolean
 *           example: false
 */