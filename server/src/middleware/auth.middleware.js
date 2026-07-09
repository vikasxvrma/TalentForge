import jwt from "jsonwebtoken";
import config from "../config/index.js";

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Authorization header missing",
      });
    }
    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Invalid Authorization Header",
      });
    }
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token missing",
      });
    }

    const decoded = jwt.verify(token, config.jwt.secret);

    req.user = decoded;

    next();
  } catch  {
    return res.status(401).json({
      success: false,
      message: "Invalid Token",
    });
  }
};

export default authMiddleware;
