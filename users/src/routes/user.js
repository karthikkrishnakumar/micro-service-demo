import express from "express";
import { authenticateUser } from "../middleware/authenticateUser.js";
import userController from "../controllers/userController.js";

/*
|--------------------------------------------------------------------------
| User API Routes
|--------------------------------------------------------------------------
|
| In this section, you can define the customer api routes and corresponding controller methods.
|
*/

const userRouter = express.Router();
const user = new userController();

/**
 * User Routes
 */
userRouter.route("/add").post(authenticateUser, user.addUser);
userRouter.route("/get").post(authenticateUser, user.getUser);
userRouter.route("/update").post(authenticateUser, user.updateUser);
userRouter.route("/list").post(authenticateUser, user.listUsers);
userRouter.route("/list_posts").post(authenticateUser, user.listPosts);
userRouter.route("/delete").post(authenticateUser, user.deleteUser);

export default userRouter;
