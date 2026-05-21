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
 *         id: 
 *           type: number
 *           example: 0
 *         text:
 *           type: string
 *           example: Buy groceries
 *         userId:
 *           type: number
 *           example: 44
 *         description:
 *           type: string
 *           example: From the supermarket
 *         isCompleted:
 *           type: boolean
 *           example: false
 */