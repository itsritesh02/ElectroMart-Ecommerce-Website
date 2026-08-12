import express from "express";

import {
  addProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/ProductController.js";

const router = express.Router();

router.post("/", addProduct);
router.get("/", getProducts);// Get All Products
router.get("/:id",getSingleProduct);// Get Single Product
router.put("/:id", updateProduct); 
router.delete("/:id", deleteProduct);


export default router;
