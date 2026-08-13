import express from "express";

import {
  getAllOrders,
  getAdminOrder,
  updateOrderStatus,
} from "../controllers/adminOrderController.js";

import protect from "../middleware/authMiddleware.js";
import admin from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/", protect, admin, getAllOrders);

router.get("/:id", protect, admin, getAdminOrder);

router.put("/:id/status", protect, admin, updateOrderStatus);

export default router;
