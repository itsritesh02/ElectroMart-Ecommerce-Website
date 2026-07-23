import express from "express";
import cors from 'cors'
import dotenv from "dotenv";
import connectDB from "./config/db.js";
const app = express();

dotenv.config();
const PORT = process.env.PORT;

connectDB();
// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  console.log("hello");
  res.json("hello");
});

app.listen(process.env.PORT, (req, res) => {
  console.log(`Surver is running on ${PORT}`);
});
