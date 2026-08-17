import express from "express";

import {
  createOrder,
  getMyOrders,
  getSingleOrder,
  cancelMyOrder,
  getAllOrders,
  updateOrderStatus,
} from "../controllers/orderController.js";

import protect from "../middleware/authMiddleware.js";
import admin from "../middleware/adminMiddleware.js";


const router = express.Router();


// ======================================================
// USER
// ======================================================

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


// ======================================================
// CANCEL MY ORDER
// ======================================================

router.put(
  "/my-orders/:id/cancel",
  protect,
  cancelMyOrder
);


router.get(
  "/:id",
  protect,
  getSingleOrder
);


// ======================================================
// ADMIN
// ======================================================

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