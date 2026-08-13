import express from "express";

import {
  addProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/ProductController.js";

import protect from "../middleware/authMiddleware.js";
import admin from "../middleware/adminMiddleware.js";

const router = express.Router();

// ==========================
// ADD PRODUCT - ADMIN
// POST /api/products
// ==========================

router.post("/", protect, admin, addProduct);

// ==========================
// GET ALL PRODUCTS
// GET /api/products
// ==========================

router.get("/", getProducts);

// ==========================
// GET SINGLE PRODUCT
// GET /api/products/:id
// ==========================

router.get("/:id", getSingleProduct);

// ==========================
// UPDATE PRODUCT - ADMIN
// PUT /api/products/:id
// ==========================

router.put("/:id", protect, admin, updateProduct);

// ==========================
// DELETE PRODUCT - ADMIN
// DELETE /api/products/:id
// ==========================

router.delete("/:id", protect, admin, deleteProduct);

export default router;
