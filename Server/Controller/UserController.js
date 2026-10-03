import User from "../Models/UserModel.js";
import env from "dotenv";
env.config();
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
const Mail = process.env.MAIL;
const MailPass = process.env.MAIL_PASS;
const secretKey = process.env.SECRET_KEY;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: Mail,
    pass: MailPass,
  },
});

const Register = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    if (!name || !email || !phone || !password) {
      return res.status(400).json({
        success: false,
        message: "Missing input field !",
      });
    }
    const isEmailExist = await User.findOne({ email });
    if (isEmailExist) {
      return res.status(400).json({
        success: false,
        message: "Email already Exist !",
      });
    }

    const isPhoneExist = await User.findOne({ phone });
    if (isPhoneExist) {
      return res.status(400).json({
        success: false,
        message: "Phone Number already Exist !",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = Math.floor(100000 + Math.random() * 900000);
    const otpExpiration = new Date(Date.now() + 5 * 60 * 1000);

    const mailMessage = {
      from: Mail,
      to: email,
      subject: "otp verification for Creating Accounnt",
      text: `Hello ${name} thank for registering with us .This is your otp ${otp} for account verification please verify within 5 minute`,
    };

    const newUser = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
      otp,
      otpExpiration,
    });

    try {
      await transporter.sendMail(mailMessage);
      return res.status(201).json({
        success: true,
        message: "Registration SuccessFully , Please Verify OTP",
        data: {
          userId: newUser._id,
          email: newUser.email,
          otpExpiration,
        },
      });
    } catch (error) {
      await newUser.deleteOne();
      return res.status(500).json({
        success: false,
        message: "Failed to send OTP. Please try again.",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Server error occured : ${error}`,
    });
  }
};

const otpVerification = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Missing input Field",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.isVerified) {
      return res.status(400).json({
        success: false,
        message: "User already verified",
      });
    }

    if (user.otp !== Number(otp)) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    if (user.otpExpiration < new Date()) {
      return res.status(400).json({
        success: false,
        message: "OTP expired",
      });
    }

    user.isVerified = true;
    user.otp = null;
    user.otpExpiration = null;

    await user.save();
    return res.status(200).json({
      success: true,
      message: "OTP verified successfully",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Missing input field",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not Found",
      });
    }
    if (!user.isVerified) {
      return res.status(401).json({
        success: false,
        message: "Please verify your account first",
      });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "Wrong Password",
      });
    }

    const payload = {
      id: user._id,
      email: user.email,
      role: user.role,
    };

    const token = jwt.sign(payload, secretKey, { expiresIn: "1d" });

    res.cookie("userToken", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Login Successful",
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

 const Logout = async (req, res) => {
  try {
    res.clearCookie("userToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error("Logout error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export { Register, otpVerification, Login, Logout };
