import generateToken from "../utils/generateToken.js";
import userRepository from "../repositories/userRepository.js";
import authRequest from "../requests/auth/authRequest.js";
import verifyTokenRequest from "../requests/auth/verifyTokenRequest.js";
import userResource from "../resources/userResource.js";
import jwt from "jsonwebtoken";

const userRepo = new userRepository();
export default class authController {
  /**
   * User Login
   *
   * @swagger
   * /auth/login:
   *   post:
   *     tags:
   *       - Auth
   *     summary: User Login
   *     operationId: login
   *     consumes:
   *       - application/json
   *     produces:
   *       - application/json
   *     requestBody:
   *       required : true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               email:
   *                 type: string
   *                 description: Your email
   *               password:
   *                 type: string
   *                 description: Your password
   *     responses:
   *       200:
   *         description: Success
   *       422:
   *         description: Unprocessable Entity
   *       401:
   *         description: Unauthenticated
   */
  async login(req, res) {
    try {
      const validatedRequest = authRequest.validate(req.body);
      const user = await userRepo.getUserByEmail(validatedRequest.email);
      if (user && (await user.matchPassword(validatedRequest.password))) {
        const token = generateToken(user._id);
        // Regenerate session with this user object
        req.session.user = user;
        const data = {
          user: userResource(user),
          token: token,
        };
        res.json({
          status: true,
          message: "Logged In Successful.",
          data: data,
        });
      } else {
        res.json({
          status: false,
          message: "Invalid email or password.",
          data: [],
        });
      }
    } catch (error) {
      res.status(422).json({
        status: false,
        message: "Failed to login.",
        errors: error,
      });
    }
  }

  /**
   * User Logout
   *
   * @swagger
   * /auth/logout:
   *   post:
   *     tags:
   *       - Auth
   *     summary: User Logout
   *     operationId: logout
   *     consumes:
   *       - application/json
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: Success
   *       422:
   *         description: Unprocessable Entity
   *       401:
   *         description: Unauthenticated
   */
  async logout(req, res) {
    req.session.token = null;
    try {
      req.session.destroy((err) => {
        if (err) {
          res.json({
            status: false,
            message: "Failed to logout.",
            data: [],
          });
        }

        res.json({
          status: true,
          message: "Logged Out Successful.",
          data: [],
        });
      });
    } catch (error) {
      res.status(422).json({
        status: false,
        message: "Failed to logout.",
        errors: error,
      });
    }
  }

  /**
   * Verify user token
   *
   * @swagger
   * /auth/verify_token:
   *   post:
   *     tags:
   *       - Auth
   *     summary: Verify user token
   *     operationId: verifyToken
   *     consumes:
   *       - application/json
   *     produces:
   *       - application/json
   *     requestBody:
   *       required : true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               token:
   *                 type: string
   *                 description: Enter the token
   *     responses:
   *       200:
   *         description: Success
   *       422:
   *         description: Unprocessable Entity
   *       401:
   *         description: Unauthenticated
   */
  async verifyToken(req, res) {
    try {
      const validatedRequest = verifyTokenRequest.validate(req.body);
      // Extract the token from the request body
      const tokenFromRequest = validatedRequest.token;
      // Verify and decode the token from the request
      const decodedToken = jwt.verify(tokenFromRequest, process.env.JWT_SECRET);
      // Compare the decoded token with the token from the session
      if (decodedToken) {
        const { userId } = decodedToken;
        const user = await userRepo.getUser(userId);
        const data = {
          user: userResource(user),
        };
        return res.json({
          status: true,
          message: "Token Verified Successfully.",
          data: data,
        });
      } else {
        return res.json({
          status: false,
          message: "Invalid token.",
          data: [],
        });
      }
    } catch (error) {
      return res.status(422).json({
        status: false,
        message: "Failed to verify token.",
        errors: error,
      });
    }
  }
}
