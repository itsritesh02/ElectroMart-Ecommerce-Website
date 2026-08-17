import express from "express";

import {
  createOrder,
  getMyOrders,
  getSingleOrder,
  cancelMyOrder,
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
} from "../controllers/orderController.js";

import protect from "../middleware/authMiddleware.js";
import admin from "../middleware/adminMiddleware.js";

const router = express.Router();

// ======================================================
// USER
// ======================================================

// CREATE ORDER
router.post("/", protect, createOrder);

// GET MY ORDERS
router.get("/my-orders", protect, getMyOrders);

// CANCEL MY ORDER
router.put("/my-orders/:id/cancel", protect, cancelMyOrder);

// GET SINGLE ORDER
router.get("/:id", protect, getSingleOrder);

// ======================================================
// ADMIN
// ======================================================

// GET ALL ORDERS
router.get("/admin/orders", protect, admin, getAllOrders);

// UPDATE ORDER STATUS
router.put("/admin/orders/:id/status", protect, admin, updateOrderStatus);

// DELETE ORDER
router.delete("/admin/orders/:orderId", protect, admin, deleteOrder);

export default router;
