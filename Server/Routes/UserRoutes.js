import express from "express";
import {
  Login,
  Logout,
  Register,
  otpVerification,
} from "../Controller/UserController.js";

import checkAuth from "../Authentication/auth.js";
const userRouter = express.Router();

userRouter.post("/register", Register);
userRouter.post("/otp-verification", otpVerification);
userRouter.post("/login", Login);
userRouter.post("/logout", checkAuth, Logout);

export default userRouter;
