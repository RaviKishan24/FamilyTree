import jwt from "jsonwebtoken";
import env from "dotenv"
import User from "../Models/UserModel.js";
env.config();
const secretKey = process.env.SECRET_KEY
const checkAuth = async (req, res, next) => {
    try {
        const token = req.cookies.userToken;
        if (!token) {
            return res.status(404).json({
                success: false,
                message: "Please Login First"
            })
        }
        const decoded = jwt.verify(token, secretKey);

        const user = await User.findById(decoded.id).select("-password");
        // console.log(user)

        if (!user) {
            return res.status(403).json({
                success: false,
                message: "user Not Fond"
            })
        }

        req.user = user;
        next();

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or Expired Token"
        })
    }

}
export default checkAuth;