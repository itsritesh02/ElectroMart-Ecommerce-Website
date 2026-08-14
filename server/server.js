import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import adminOrderRoutes from "./routes/adminOrderRoutes.js";
import adminUserRoutes from "./routes/adminUserRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";

const app = express();

// ==========================
// ENV
// ==========================

dotenv.config();

const PORT = process.env.PORT;

// ==========================
// DATABASE
// ==========================

connectDB();

// ==========================
// MIDDLEWARES
// ==========================

app.use(cors());

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  }),
);

// ==========================
// ROUTES
// ==========================

app.use("/api/auth", authRoutes);

app.use("/api/products", productRoutes);

app.use("/api/orders", orderRoutes);

app.use("/api/admin/orders", adminOrderRoutes);
app.use("/api/admin/users", adminUserRoutes);
app.use("/api/upload", uploadRoutes);

app.use("/api/payment", paymentRoutes);

// ==========================
// HOME
// ==========================

app.get("/", (req, res) => {
  res.json({
    success: true,

    message: "ElectroMart API Running",
  });
});


// ==========================
// SERVER
// ==========================

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
