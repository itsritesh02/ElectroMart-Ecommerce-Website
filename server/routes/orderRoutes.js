import express from "express";

import {
  createOrder,
  getMyOrders,
  getSingleOrder,
} from "../controllers/orderController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// ==========================
// CREATE ORDER
// ==========================

router.post("/", protect, createOrder);

// ==========================
// GET MY ORDERS
// ==========================

router.get("/my-orders", protect, getMyOrders);

// ==========================
// GET SINGLE ORDER
// ==========================

router.get("/:id", protect, getSingleOrder);

export default router;
