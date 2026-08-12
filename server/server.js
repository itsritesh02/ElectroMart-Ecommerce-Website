import express from "express";
import cors from 'cors'
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

const app = express();

dotenv.config();
const PORT = process.env.PORT;

connectDB();
// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "ElectroMart API Running",
  });
});

app.listen(process.env.PORT, (req, res) => {
  console.log(`Server is running on ${PORT}`);
});
