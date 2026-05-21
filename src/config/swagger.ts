import swaggerJsdoc from "swagger-jsdoc";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Task Manager API",
            version: "1.0.0",
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