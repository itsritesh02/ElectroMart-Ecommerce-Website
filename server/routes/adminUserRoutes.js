
import express from "express";

import {
  getAllUsers,
  getSingleUser,
  updateUserRole,
  deleteUser,
} from "../controllers/adminUserController.js";

import protect from "../middleware/authMiddleware.js";

import admin from "../middleware/adminMiddleware.js";


const router = express.Router();


// ==========================
// GET ALL USERS
// GET /api/admin/users
// ==========================

router.get(
  "/",
  protect,
  admin,
  getAllUsers
);


// ==========================
// GET SINGLE USER
// GET /api/admin/users/:id
// ==========================

router.get(
  "/:id",
  protect,
  admin,
  getSingleUser
);


// ==========================
// UPDATE USER ROLE
// PUT /api/admin/users/:id/role
// ==========================

router.put(
  "/:id/role",
  protect,
  admin,
  updateUserRole
);


// ==========================
// DELETE USER
// DELETE /api/admin/users/:id
// ==========================

router.delete(
  "/:id",
  protect,
  admin,
  deleteUser
);


export default router;
