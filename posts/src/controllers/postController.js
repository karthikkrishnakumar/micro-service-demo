import postRepository from "../repositories/postRepository.js";
import addPostRequest from "../requests/post/addPostRequest.js";
import deletePostRequest from "../requests/post/deletePostRequest.js";
import getPostRequest from "../requests/post/getPostRequest.js";
import updatePostRequest from "../requests/post/updatePostRequest.js";
import listPostsByUserIdRequest from "../requests/post/listPostsByUserIdRequest.js";
import postResource from "../resources/postResource.js";
const postRepo = new postRepository();

export default class postController {
  /**
   * Add Post
   *
   * @swagger
   * /post/add:
   *   post:
   *     tags:
   *       - Post
   *     summary: Add post
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               post:
   *                 type: string
   *                 description: Enter first name
   *               user_id:
   *                 type: string
   *                 description: Enter the user id
   *     responses:
   *       200:
   *         description: Success
   *       400:
   *         description: Bad Request
   *       500:
   *         description: Internal Server Error
   */
  async addPost(req, res) {
    const { post, user_id } = req.body;

    const postRequest = new addPostRequest({
      post,
      user_id,
    });
    try {
      const validatedData = await postRequest.validate();

      const postDetails = await postRepo.addPost(validatedData);

      if (postDetails) {
        const postData = postResource(postDetails);
        res.status(200).json({
          status: true,
          message: "Post data added successfully.",
          data: postData,
        });
      } else {
        res.status(200).json({
          status: false,
          message: "Failed to add post.",
          data: [],
        });
      }
    } catch (error) {
      res.status(422).json({
        status: false,
        message: "Failed to add post.",
        errors: error,
      });
    }
  }

  /**
   * Get Post
   *
   * @swagger
   * /post/get:
   *   post:
   *     tags:
   *       - Post
   *     summary: Get Post
   *     security:
   *       - bearerAuth: []
   *     produces:
   *       - application/json
   *     requestBody:
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               id:
   *                 type: id
   *                 description: Enter id
   *     responses:
   *       200:
   *         description: Success
   *       422:
   *         description: Unprocessable Entity
   *       401:
   *         description: Unauthenticated
   */
  async getPost(req, res) {
    const { id } = req.body;
    const postRequest = new getPostRequest({ id });

    try {
      const validatedData = await postRequest.validate();
      const postData = await postRepo.getPost(validatedData.id);

      if (postData) {
        const postDetails = postResource(postData);
        res.status(200).json({
          status: true,
          message: "Post data fetched successfully.",
          data: postDetails,
        });
      } else {
        res.status(200).json({
          status: false,
          message: "Failed to get post.",
          data: [],
        });
      }
    } catch (error) {
      res.status(422).json({
        status: false,
        message: "Failed to get post.",
        errors: error,
      });
    }
  }

  /**
   * Update Post
   *
   * @swagger
   * /post/update:
   *   post:
   *     tags:
   *       - Post
   *     summary: Update post
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               id:
   *                 type: string
   *                 description: Enter the post id
   *               post:
   *                 type: string
   *                 description: Enter the post
   *     responses:
   *       200:
   *         description: Success
   *       400:
   *         description: Bad Request
   *       500:
   *         description: Internal Server Error
   */
  async updatePost(req, res) {
    const { id, post } = req.body;
    const postRequest = new updatePostRequest({
      id,
      post,
    });
    try {
      const validatedData = await postRequest.validate();
      const updatedPost = await postRepo.updatePost(validatedData);
      if (updatedPost) {
        const postData = postResource(updatedPost);
        res.status(200).json({
          status: true,
          message: "Post data updated successfully.",
          data: postData,
        });
      } else {
        res.status(200).json({
          status: false,
          message: "Unable to update post.",
          data: [],
        });
      }
    } catch (error) {
      res.status(200).json({
        status: false,
        message: "Unable to update post.",
        errors: error,
      });
    }
  }

  /**
   * List Posts
   *
   * @swagger
   * /post/list:
   *   post:
   *     tags:
   *       - Post
   *     summary: List Posts
   *     security:
   *       - bearerAuth: []
   *     produces:
   *       - application/json
   *     requestBody:
   *       content:
   *         application/json:
   *     responses:
   *       200:
   *         description: Success
   *       422:
   *         description: Unprocessable Entity
   *       401:
   *         description: Unauthenticated
   */
  async listPosts(req, res) {
    try {
      const posts = await postRepo.listPosts();
      if (posts) {
        const postsData = posts.items.map((post) => postResource(post));
        const data = {
          posts: postsData,
          postCount: posts.total,
        };
        res.status(200).json({
          status: true,
          message: "Posts listed successfully.",
          data: data,
        });
      } else {
        res.status(200).json({
          status: false,
          message: "Unable to list posts.",
          data: [],
        });
      }
    } catch (error) {
      res.status(422).json({
        status: false,
        message: "Failed to list posts.",
        errors: error,
      });
    }
  }

  /**
   * Delete Post
   *
   * @swagger
   * /post/delete:
   *   post:
   *     tags:
   *       - Post
   *     summary: Delete Post
   *     security:
   *       - bearerAuth: []
   *     produces:
   *       - application/json
   *     requestBody:
   *       required : true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               id:
   *                 type: string
   *                 description: Enter id
   *     responses:
   *       200:
   *         description: Success
   *       422:
   *         description: Unprocessable Entity
   *       401:
   *         description: Unauthenticated
   */
  async deletePost(req, res) {
    const { id } = req.body;
    const postRequest = new deletePostRequest({ id });
    try {
      const validatedData = await postRequest.validate();
      const deletePost = await postRepo.deletePost(validatedData.id);
      if (deletePost) {
        res.status(200).json({
          status: true,
          message: "Post deleted successfully.",
        });
      } else {
        res.status(200).json({
          status: false,
          message: "Unable to delete post",
        });
      }
    } catch (error) {
      res.status(200).json({
        status: false,
        message: "Unable to delete post",
        errors: error,
      });
    }
  }

  /**
   * Get Post
   *
   * @swagger
   * /post/list_user_posts:
   *   post:
   *     tags:
   *       - Post
   *     summary: Get Post
   *     security:
   *       - bearerAuth: []
   *     produces:
   *       - application/json
   *     requestBody:
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               user_id:
   *                 type: string
   *                 description: Enter user id
   *     responses:
   *       200:
   *         description: Success
   *       422:
   *         description: Unprocessable Entity
   *       401:
   *         description: Unauthenticated
   */
  async listUserPosts(req, res) {
    const { user_id } = req.body;
    const postRequest = new listPostsByUserIdRequest({ user_id });

    try {
      const validatedData = await postRequest.validate();
      const postData = await postRepo.listPostsByUserId(validatedData.user_id);
      if (postData) {
        const postDetails = postResource(postData);
        res.status(200).json({
          status: true,
          message: "Post data fetched successfully.",
          data: postData,
        });
      } else {
        res.status(200).json({
          status: false,
          message: "Failed to get post.",
          data: [],
        });
      }
    } catch (error) {
      res.status(422).json({
        status: false,
        message: "Failed to get post.",
        errors: error,
      });
    }
  }
}
