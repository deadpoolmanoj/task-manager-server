import swaggerJsdoc from "swagger-jsdoc";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Task Manager API",
            version: "1.0.0",
            description: `
                ## How this API works

                ### Authentication
                - **/auth routes** — Public. No token needed. Use /register then /login to get your JWT token.

                ### Tasks
                - **/tasks routes** — Requires JWT token. Any logged-in user can manage their own tasks.

                ### Users (Admin only)
                - **/users routes** — Requires JWT token with **admin role**.
                - To become admin: manually set role to 'admin' in the database first.
                - After that, the admin can create/manage other users via these routes.

                ### How to authenticate in Swagger
                1. Hit POST /api/v1/auth/login
                2. Copy the token from the response
                3. Click the **Authorize 🔒** button at the top
                4. Paste the token and click Authorize
            `,
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                }
            }
        },
        security: [{ bearerAuth: [] }],
    },
    apis: [
        "./src/modules/**/route.ts",
        "./src/shared/swagger-schemas.ts",
    ],

};

export const swaggerSpec = swaggerJsdoc(options);