// Entry point of the application

import "dotenv/config";

import app from "./app.js";
import logger from "./config/logger.js";
import pool from "./config/db.js";
import { initializeApp } from "./config/initializeApp.js";
import config from "./config/index.js";

const PORT = config.port || 3000;

try {
    // Initialize external services
    await initializeApp();

    // Verify PostgreSQL connection
    const client = await pool.connect();
    logger.info("✅ PostgreSQL Connected");
    client.release();

    // Start accepting requests only after dependencies are healthy
    app.listen(PORT, () => {
        logger.info(`🚀 Server started successfully on port ${PORT}`);
    });

} catch (error) {
    logger.fatal(error, "Application failed to start");
    process.exit(1);
}