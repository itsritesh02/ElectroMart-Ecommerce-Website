import express from "express";

import {
  getAllOrders,
  getAdminOrder,
  updateOrderStatus,
} from "../controllers/adminOrderController.js";

import protect from "../middleware/authMiddleware.js";

import admin from "../middleware/adminMiddleware.js";

const router = express.Router();

// ==========================
// GET ALL ORDERS
// ==========================

router.get("/", protect, admin, getAllOrders);

// ==========================
// GET SINGLE ORDER
// ==========================

router.get("/:id", protect, admin, getAdminOrder);

// ==========================
// UPDATE ORDER STATUS
// ==========================

router.put("/:id/status", protect, admin, updateOrderStatus);

export default router;
