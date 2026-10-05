import User from "../Models/UserModel.js";
import env from "dotenv";
env.config();
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const secretKey = process.env.SECRET_KEY;
const BREVO_API_KEY = process.env.BREVO_API_KEY;
const SENDER_EMAIL = process.env.SENDER_EMAIL || "ravikishankumar71@gmail.com";
const SENDER_NAME = process.env.SENDER_NAME || "Family Tree Builder";

// ─────────────────────────────────────────────
// HELPER: SEND EMAIL VIA BREVO (HTTP API)
// ─────────────────────────────────────────────
const sendEmailViaBrevo = async ({ to, name, subject, htmlContent }) => {
  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      accept: "application/json",
      "api-key": BREVO_API_KEY,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      sender: {
        name: SENDER_NAME,
        email: SENDER_EMAIL,
      },
      to: [{ email: to, name: name }],
      subject: subject,
      htmlContent: htmlContent,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("❌ Brevo API Error:", errorData);
    throw new Error("Failed to send email via Brevo");
  }

  return response.json();
};

// ─────────────────────────────────────────────
// REGISTER
// ─────────────────────────────────────────────
const Register = async (req, res) => {
  try {
    const { name, phone, password } = req.body;
    const email = req.body.email?.toLowerCase().trim();

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

    const newUser = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
      otp,
      otpExpiration,
    });

    try {
      await sendEmailViaBrevo({
        to: email,
        name: name,
        subject: "OTP verification for creating account",
        htmlContent: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px;">
            <h2 style="color: #1b5e20;">Welcome to SportsMart, ${name}!</h2>
            <p>Thank you for registering with us. Use the OTP below to verify your account:</p>
            <div style="background: #f0f9f0; padding: 15px; border-radius: 8px; text-align: center; margin: 20px 0;">
              <h1 style="color: #1b5e20; letter-spacing: 6px; margin: 0;">${otp}</h1>
            </div>
            <p>This OTP is valid for <strong>5 minutes</strong>. Do not share it with anyone.</p>
            <p style="color: #888; font-size: 12px; margin-top: 30px;">If you didn't request this, please ignore this email.</p>
          </div>
        `,
      });

      console.log("✅ OTP email sent to:", email);

      return res.status(201).json({
        success: true,
        message: "Registration Successful, Please Verify OTP",
        data: {
          userId: newUser._id,
          email: newUser.email,
          otpExpiration,
        },
      });
    } catch (error) {
      console.error("❌ Failed to send OTP email:", error.message);
      await newUser.deleteOne();
      return res.status(500).json({
        success: false,
        message: "Failed to send OTP. Please try again.",
      });
    }
  } catch (error) {
    console.error("Register error:", error);
    return res.status(500).json({
      success: false,
      message: `Server error occurred: ${error.message}`,
    });
  }
};

// ─────────────────────────────────────────────
// OTP VERIFICATION
// ─────────────────────────────────────────────
const otpVerification = async (req, res) => {
  try {
    const { otp } = req.body;
    const email = req.body.email?.toLowerCase().trim();

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Missing input field",
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

// ─────────────────────────────────────────────
// LOGIN
// ─────────────────────────────────────────────
const Login = async (req, res) => {
  try {
    const { password } = req.body;
    const email = req.body.email?.toLowerCase().trim();

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
    const isProduction = process.env.NODE_ENV === "production";

    res.cookie("userToken", token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      maxAge: 24 * 60 * 60 * 1000,
      path: "/",
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

// ─────────────────────────────────────────────
// LOGOUT
// ─────────────────────────────────────────────
const Logout = async (req, res) => {
  try {
    const isProduction = process.env.NODE_ENV === "production";

    res.clearCookie("userToken", {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      path: "/",
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