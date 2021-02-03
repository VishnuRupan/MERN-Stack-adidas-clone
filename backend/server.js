import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

const PORT = process.env.PORT || 5000;
const app = express();

dotenv.config();
connectDB();

app.use("/api/products", productRoutes);

app.use(notFound);

app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("Api running");
});

app.listen(
  PORT,
  console.log(`"Server Running in ${process.env.NODE_ENV} on PORT ${PORT}:"`)
);
