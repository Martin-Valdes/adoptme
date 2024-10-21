import swaggerJSDoc from "swagger-jsdoc";

const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.1",
        info:{
            title: "Documentacion API Adopciones",
            version: "1.0.0",
            description: "API de Adopciones"
        }
    },
    apis: ["./src/docs/**/*.yaml"]
}

export const specs = swaggerJSDoc(swaggerOptions);