

 import express from "express";

import {
  addProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/ProductController.js";

const router = express.Router();


// ==========================
// ADD PRODUCT
// POST /api/products
// ==========================

router.post(
  "/",
  addProduct
);


// ==========================
// GET ALL PRODUCTS
// GET /api/products
// ==========================

router.get(
  "/",
  getProducts
);


// ==========================
// GET SINGLE PRODUCT
// GET /api/products/:id
// ==========================

router.get(
  "/:id",
  getSingleProduct
);


// ==========================
// UPDATE PRODUCT
// PUT /api/products/:id
// ==========================

router.put(
  "/:id",
  updateProduct
);


// ==========================
// DELETE PRODUCT
// DELETE /api/products/:id
// ==========================

router.delete(
  "/:id",
  deleteProduct
);


export default router;