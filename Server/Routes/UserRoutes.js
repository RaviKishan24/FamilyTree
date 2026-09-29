import express from "express";
import { Login, Register, otpVerification } from "../Controller/UserController.js";


const userRouter = express.Router();

userRouter.post("/register", Register);
userRouter.post('/otp-verification', otpVerification);
userRouter.post("/Login",Login);

export default userRouter;