import "../config/env.js";

import express from "express";
import cors from "cors";
import connectDB from "../config/database.js";
import authRoutes from "../routes/auth.js";
import productRoutes from "../routes/products.js";
import orderRoutes from "../routes/orders.js";


await connectDB();

const app = express();

app.use(
    cors({
        origin: process.env.FRONTEND_URL || "*",
        credentials: true,
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        message: "Servidor funcionando correctamente",
        timestamp: new Date().toISOString(),
    });
});

export default app;