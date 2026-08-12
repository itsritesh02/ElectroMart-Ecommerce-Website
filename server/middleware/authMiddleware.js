import jwt from "jsonwebtoken";
import User from "../models/User.js";

const protect = async (req, res, next) => {
  try {
    // ==========================
    // GET AUTHORIZATION HEADER
    // ==========================

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Not authorized. Token missing",
      });
    }

    // ==========================
    // GET TOKEN
    // ==========================

    const token = authHeader.split(" ")[1];

    // ==========================
    // VERIFY TOKEN
    // ==========================

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ==========================
    // FIND USER
    // ==========================

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    // ==========================
    // STORE USER IN REQUEST
    // ==========================

    req.user = user;

    // ==========================
    // NEXT
    // ==========================

    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error);

    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};

export default protect;
