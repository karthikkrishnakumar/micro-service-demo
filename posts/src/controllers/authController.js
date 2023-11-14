import generateToken from "../utils/generateToken.js";
import userRepository from "../repositories/postRepository.js";
import authRequest from "../requests/post/authRequest.js";
import userResource from "../resources/postResource.js";

const userRepo = new userRepository();
export default class authController {
  /**
   * User Login
   *
   * @swagger
   * /user/login:
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
   * /user/logout:
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
}
