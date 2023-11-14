import express from "express";
import connectDB from "./src/config/db.js";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import axios from "axios";
import authRouter from "./src/routes/auth.js";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import swagger from "./src/config/swagger.js";
import session from "express-session";
import morgan from "morgan";
import cors from "cors";

const app = express();
dotenv.config();
app.use(cors());
// Set the port and hostname for the server
const port = process.env.PORT || 3000;
const hostname = process.env.HOST || "localhost";
connectDB();

// Use Morgan for request and response logging
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

// Import MongoDB connection and establish the database connection

// Main endpoint
app.get("/", (req, res) => {
  res.send("This is our main endpoint");
});

// Set up Express session for handling user sessions
app.use(
  session({
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    secret: "secret",
  })
);

// Set up Swagger API documentation
const specs = swaggerJsdoc(swagger);
app.use(
  "/api/documentation",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);

app.use("/api/auth", authRouter); // User API routes

app.listen(port, hostname, () => {
  console.log(`Server is running at http://${hostname}:${port}/`);
});
