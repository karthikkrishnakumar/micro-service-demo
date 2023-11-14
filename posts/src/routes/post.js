import express from "express";
import { authenticateUser } from "../middleware/authenticateUser.js";
import postController from "../controllers/postController.js";

/*
|--------------------------------------------------------------------------
| User API Routes
|--------------------------------------------------------------------------
|
| In this section, you can define the customer api routes and corresponding controller methods.
|
*/

const postRouter = express.Router();
const post = new postController();

/**
 * User Routes
 */
postRouter.route("/add").post(authenticateUser, post.addPost);
postRouter.route("/get").post(authenticateUser, post.getPost);
postRouter.route("/update").post(authenticateUser, post.updatePost);
postRouter.route("/list").post(authenticateUser, post.listPosts);
postRouter.route("/list_user_posts").post(authenticateUser, post.listUserPosts);
postRouter.route("/delete").post(authenticateUser, post.deletePost);

export default postRouter;
