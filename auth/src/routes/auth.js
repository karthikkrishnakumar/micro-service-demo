import express from "express";
import { authenticateUser } from "../middleware/authenticateUser.js";
import authController from "../controllers/authController.js";

/*
|--------------------------------------------------------------------------
| User API Routes
|--------------------------------------------------------------------------
|
| In this section, you can define the customer api routes and corresponding controller methods.
|
*/

const userRouter = express.Router();
const auth = new authController();

userRouter.route("/login").post(auth.login);
userRouter.route("/logout").post(authenticateUser, auth.logout);
userRouter.route("/verify_token").post(auth.verifyToken);

export default userRouter;
