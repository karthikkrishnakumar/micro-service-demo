import jwt from "jsonwebtoken";
import User from "../model/user.js";
import http from "../utils/http.js";

/**
 * @DESC Verify JWT from authorization header Middleware
 */
const authenticateUser = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    res.status(401).json({ message: "Unauthorized" });
  } else {
    const token = authHeader.split(" ")[1];
    if (token) {
      const props = {
        token: token,
      };

      const { body } = await http("auth").post(
        "/api/auth/verify_token",
        props,
        false
      );
      if (body.status === true) {
        req.session.user = body.data.user;
        next();
      } else {
        res.status(401).json({ message: "Unauthorized" });
      }
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  }
};

export { authenticateUser };
