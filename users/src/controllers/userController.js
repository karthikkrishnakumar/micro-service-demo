import commonRepository from "../repositories/commonRepository.js";
import userRepository from "../repositories/userRepository.js";
import addUserRequest from "../requests/user/addUserRequest.js";
import deleteUserRequest from "../requests/user/deleteUserRequest.js";
import getUserRequest from "../requests/user/getUserRequest.js";
import listUserRequest from "../requests/user/listUserRequest.js";
import updateUserRequest from "../requests/user/updateUserRequest.js";
import userResource from "../resources/userResource.js";
import bcryptPassword from "../utils/bcryptPassword.js";
const userRepo = new userRepository();
const commonRepo = new commonRepository();
export default class userController {
  /**
   * Add User
   *
   * @swagger
   * /user/add:
   *   post:
   *     tags:
   *       - User
   *     summary: Add user
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               first_name:
   *                 type: string
   *                 description: Enter first name
   *               last_name:
   *                 type: string
   *                 description: Enter last name
   *               email:
   *                 type: string
   *                 description: Enter email address
   *               phone:
   *                 type: string
   *                 description: Enter phone number
   *               address:
   *                 type: string
   *                 description: Enter address
   *               password:
   *                 type: string
   *                 description: Enter password
   *     responses:
   *       200:
   *         description: Success
   *       400:
   *         description: Bad Request
   *       500:
   *         description: Internal Server Error
   */
  async addUser(req, res) {
    const { first_name, last_name, email, phone, address, password } = req.body;

    const userRequest = new addUserRequest({
      first_name,
      last_name,
      email,
      phone,
      address,
      password,
    });
    try {
      const validatedData = await userRequest.validate();

      validatedData["password"] = await bcryptPassword(validatedData.password);
      const userDetails = await userRepo.addUser(validatedData);

      if (userDetails) {
        const userData = userResource(userDetails);
        res.status(200).json({
          status: true,
          message: "User data added successfully.",
          data: userData,
        });
      } else {
        res.status(200).json({
          status: false,
          message: "Failed to add user.",
          data: [],
        });
      }
    } catch (error) {
      res.status(422).json({
        status: false,
        message: "Failed to add user.",
        errors: error,
      });
    }
  }

  /**
   * Get User
   *
   * @swagger
   * /user/get:
   *   post:
   *     tags:
   *       - User
   *     summary: Get User
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
  async getUser(req, res) {
    const { id } = req.body;
    const userRequest = new getUserRequest({ id });

    try {
      const validatedData = await userRequest.validate();
      const userData = await userRepo.getUser(validatedData.id);

      if (userData) {
        const userDetails = userResource(userData);
        res.status(200).json({
          status: true,
          message: "User data fetched successfully.",
          data: userDetails,
        });
      } else {
        res.status(200).json({
          status: false,
          message: "Failed to get user.",
          data: [],
        });
      }
    } catch (error) {
      res.status(422).json({
        status: false,
        message: "Failed to get user.",
        errors: error,
      });
    }
  }

  /**
   * Update User
   *
   * @swagger
   * /user/update:
   *   post:
   *     tags:
   *       - User
   *     summary: Update user
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
   *                 description: Enter the user id
   *               first_name:
   *                 type: string
   *                 description: Enter first name
   *               last_name:
   *                 type: string
   *                 description: Enter last name
   *               email:
   *                 type: string
   *                 description: Enter email address
   *               phone:
   *                 type: string
   *                 description: Enter phone number
   *               address:
   *                 type: string
   *                 description: Enter address
   *               password:
   *                 type: string
   *                 description: Enter password
   *     responses:
   *       200:
   *         description: Success
   *       400:
   *         description: Bad Request
   *       500:
   *         description: Internal Server Error
   */
  async updateUser(req, res) {
    const { id, first_name, last_name, email, phone, address } = req.body;
    const userRequest = new updateUserRequest({
      id,
      first_name,
      last_name,
      email,
      phone,
      address,
    });
    try {
      const validatedData = await userRequest.validate();
      const updatedUser = await userRepo.updateUser(validatedData);
      if (updatedUser) {
        const userData = userResource(updatedUser);
        res.status(200).json({
          status: true,
          message: "User data updated successfully.",
          data: userData,
        });
      } else {
        res.status(200).json({
          status: false,
          message: "Unable to update user.",
          data: [],
        });
      }
    } catch (error) {
      res.status(200).json({
        status: false,
        message: "Unable to update user.",
        errors: error,
      });
    }
  }

  /**
   * List Users
   *
   * @swagger
   * /user/list:
   *   post:
   *     tags:
   *       - User
   *     summary: List Users
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
  async listUsers(req, res) {
    try {
      const users = await userRepo.listUsers();
      if (users) {
        const usersData = users.items.map((user) => userResource(user));
        const data = {
          users: usersData,
          userCount: users.total,
        };
        res.status(200).json({
          status: true,
          message: "Users listed successfully.",
          data: data,
        });
      } else {
        res.status(200).json({
          status: false,
          message: "Unable to list users.",
          data: [],
        });
      }
    } catch (error) {
      res.status(422).json({
        status: false,
        message: "Failed to list users.",
        errors: error,
      });
    }
  }

  /**
   * Delete User
   *
   * @swagger
   * /user/delete:
   *   post:
   *     tags:
   *       - User
   *     summary: Delete User
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
  async deleteUser(req, res) {
    const { id } = req.body;
    const userRequest = new deleteUserRequest({ id });
    try {
      const validatedData = await userRequest.validate();
      const deleteUser = await userRepo.deleteUser(validatedData.id);
      if (deleteUser) {
        res.status(200).json({
          status: true,
          message: "User deleted successfully.",
        });
      } else {
        res.status(200).json({
          status: false,
          message: "Unable to delete user",
        });
      }
    } catch (error) {
      res.status(200).json({
        status: false,
        message: "Unable to delete user",
        errors: error,
      });
    }
  }

  /**
   * List user posts
   *
   * @swagger
   * /user/list_posts:
   *   post:
   *     tags:
   *       - User
   *     summary: List User Posts
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
   *                 description: Enter the id
   *     responses:
   *       200:
   *         description: Success
   *       422:
   *         description: Unprocessable Entity
   *       401:
   *         description: Unauthenticated
   */
  async listPosts(req, res) {
    const { id } = req.body;
    const userRequest = new listUserRequest({ id });
    try {
      const validatedData = await userRequest.validate();
      const postData = await commonRepo.listUserPosts(validatedData.id);

      if (postData) {
        // const userDetails = userResource(userData);
        res.status(200).json({
          status: true,
          message: "User posts fetched successfully.",
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
