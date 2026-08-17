import User from "../models/User.js";
import jwt from "jsonwebtoken";
import generateToken from "../utils/generateToken.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import nodemailer from "nodemailer";
//Register

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    //Check Empty  Fields
    if (!name || !email || !password || !phone) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    //Check ExixtingUser

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already registered",
      });
    }

    //Hash Password

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create User
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
    });

    // Generate JWT Token
    const token = generateToken(user._id, user.role);

    res.status(201).json({
      success: true,
      message: "Registration Successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and Password are required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Invalid Email or Password",
        });
      }
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid Email or Password",
      });
    }

    const token = generateToken(user._id, user.role);

    res.status(200).json({
      success: true,
      message: "Login Successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    const user = await User.findOne({
      email: email.toLowerCase(),
    });

    if (!user) {
      return res.status(404).json({
        message: "No account found with this email.",
      });
    }

    // ==========================
    // CREATE RESET TOKEN
    // ==========================

    const resetToken = crypto.randomBytes(32).toString("hex");

    // ==========================
    // SAVE TOKEN
    // ==========================

    user.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    // TOKEN VALID FOR 15 MINUTES

    user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    await user.save();

    // ==========================
    // RESET URL
    // ==========================

    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    // ==========================
    // EMAIL
    // ==========================

    const transporter = nodemailer.createTransport({
      service: "gmail",

      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"ElectroMart" <${process.env.EMAIL_USER}>`,

      to: user.email,

      subject: "ElectroMart - Password Reset",

      html: `
        <div style="
          font-family: Arial;
          max-width: 600px;
          margin: auto;
          padding: 30px;
          border: 1px solid #ddd;
          border-radius: 10px;
        ">

          <h2>
            ElectroMart
          </h2>

          <h3>
            Reset Your Password
          </h3>

          <p>
            We received a request to reset
            your ElectroMart account password.
          </p>

          <p>
            Click the button below to create
            a new password.
          </p>

          <a
            href="${resetUrl}"
            style="
              display: inline-block;
              padding: 12px 20px;
              background: #111827;
              color: white;
              text-decoration: none;
              border-radius: 6px;
            "
          >
            Reset Password
          </a>

          <p style="margin-top: 20px;">
            This link will expire in
            <strong>15 minutes</strong>.
          </p>

          <p>
            If you did not request this,
            you can safely ignore this email.
          </p>

        </div>
      `,
    });

    return res.status(200).json({
      message: "Password reset link has been sent to your email.",
    });
  } catch (error) {
    console.error("Forgot Password Error:", error);

    return res.status(500).json({
      message: "Failed to send password reset email.",
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;

    const { password } = req.body;

    if (!password) {
      return res.status(400).json({
        message: "Password is required.",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters.",
      });
    }

    // ==========================
    // HASH TOKEN
    // ==========================

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    // ==========================
    // FIND USER
    // ==========================

    const user = await User.findOne({
      resetPasswordToken: hashedToken,

      resetPasswordExpire: {
        $gt: Date.now(),
      },
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid or expired reset link.",
      });
    }

    // ==========================
    // HASH PASSWORD
    // ==========================

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    // ==========================
    // CLEAR RESET TOKEN
    // ==========================

    user.resetPasswordToken = null;

    user.resetPasswordExpire = null;

    await user.save();

    return res.status(200).json({
      message: "Password reset successfully.",
    });
  } catch (error) {
    console.error("Reset Password Error:", error);

    return res.status(500).json({
      message: "Failed to reset password.",
    });
  }
};