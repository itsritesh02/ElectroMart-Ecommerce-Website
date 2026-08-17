import express from "express";

import {
  registerUser,
  LoginUser,
  forgotPassword,
  resetPassword,
} from "../controllers/authController.js";

const router = express.Router();

// ==========================
// REGISTER
// ==========================

router.post("/register", registerUser);

// ==========================
// LOGIN
// ==========================

router.post("/login", LoginUser);

// ==========================
// FORGOT PASSWORD
// ==========================

router.post("/forgot-password", forgotPassword);

// ==========================
// RESET PASSWORD
// ==========================

router.put("/reset-password/:token", resetPassword);

export default router;
