
import express from "express";

import {
  createOrder,
  getMyOrders,
  getSingleOrder,
  getAllOrders,
  updateOrderStatus,
} from "../controllers/orderController.js";

import protect from "../middleware/authMiddleware.js";
import admin from "../middleware/adminMiddleware.js";

const router = express.Router();

router.post(
  "/",
  protect,
  createOrder
);

router.get(
  "/my-orders",
  protect,
  getMyOrders
);

router.get(
  "/:id",
  protect,
  getSingleOrder
);

router.get(
  "/admin/orders",
  protect,
  admin,
  getAllOrders
);

router.put(
  "/admin/orders/:id/status",
  protect,
  admin,
  updateOrderStatus
);

export default router;
