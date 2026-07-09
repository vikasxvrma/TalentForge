import "dotenv/config"; // Ensures environment variables are loaded first

import pg from "pg";
import config from "./index.js";

const { Pool } = pg;

const pool = new Pool({
  connectionString:config.database.url,
});
console.log(pool.options);

export default pool;
