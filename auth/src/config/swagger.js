/**
 * Swagger configurations
 */
const swagger = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "User - API with Swagger",
      version: "0.1.0",
      description:
        "This is User API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "User",
        url: "https://test.com",
        email: "info@email.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3001/api",
        description: "Local server",
      },
    ],
    //auth setup start
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          in: "header",
          name: "Authorization",
          description: "Bearer token to access these api endpoints",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    //auth setup end
  },
  apis: ["./src/controllers/*.js"],
};

export default swagger;
