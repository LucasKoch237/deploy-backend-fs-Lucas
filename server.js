import "./config/env.js";

import express from "express";
import cors from "cors";
import connectDB from "./config/database.js";
import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/products.js";
import orderRoutes from "./routes/orders.js";

connectDB();

const app = express();

app.use(
    cors({
        origin: process.env.FRONTEND_URL || "http://localhost:5173",
        credentials: true,
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === "development") {
    app.use((req, res, next) => {
        console.log(`${req.method} ${req.path}`);
        next();
    });
}

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

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Ruta no encontrada",
    });
});

app.use((err, req, res, next) => {
    console.error("Error:", err);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Error interno del servidor",
        ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
    console.log(`📡 Ambiente: ${process.env.NODE_ENV || "development"}`);
});