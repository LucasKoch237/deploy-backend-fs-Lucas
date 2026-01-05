import "../config/env.js";

import express from "express";
import cors from "cors";
import connectDB from "../config/database.js";

const app = express();

// Middleware básicos
app.use(cors());
app.use(express.json());

// Conectar Mongo SOLO cuando llega una request
app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (err) {
        console.error("Mongo error:", err);
        res.status(500).json({ error: "Database connection failed" });
    }
});

// Health check SIMPLE
app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "API funcionando correctamente",
    });
});

export default app;