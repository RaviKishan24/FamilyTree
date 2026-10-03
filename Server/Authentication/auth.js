import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../Models/UserModel.js";
dotenv.config();

const secretKey = process.env.SECRET_KEY;

const checkAuth = async (req, res, next) => {
  try {
    // 1. Read cookie safely
    const token = req.cookies?.userToken;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authenticated. Please login first.",
      });
    }

    // 2. Verify JWT
    let decoded;
    try {
      decoded = jwt.verify(token, secretKey);
    } catch (err) {
      return res.status(401).json({
        success: false,
        message:
          err.name === "TokenExpiredError"
            ? "Session expired. Please login again."
            : "Invalid token.",
      });
    }

    // 3. Load user from DB
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User no longer exists. Please register again.",
      });
    }

    // 4. Attach to request
    req.user = user;
    next();
  } catch (error) {
    console.error("checkAuth error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export default checkAuth;