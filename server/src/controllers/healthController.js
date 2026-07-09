import pool from "../config/db.js";
import config from "../config/index.js";
import { qdrant } from "../config/qdrant.js";


export const healthController = async (req, res) => {
    const services = {
        backend: "up",
        postgres: "down",
        qdrant: "down",
        gemini: config.gemini.apiKey ? "configured" : "down",
    };

    // PostgreSQL Health Check
    try {
        await pool.query("SELECT 1");
        services.postgres = "up";
    } catch  {
        services.postgres = "down";
    }

    // Qdrant Health Check
    try {
        await qdrant.getCollections();
        services.qdrant = "up";
    } catch  {
        services.qdrant = "down";
    }

    const healthy = Object.values(services).every(
        (value) => value === "up" || value === "configured"
    );

    return res.status(healthy ? 200 : 503).json({
        status: healthy ? "healthy" : "unhealthy",
        timestamp: new Date().toISOString(),
        services,
    });
};