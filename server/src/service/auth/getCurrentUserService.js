import pool from "../../config/db.js";

const getCurrentUserService = async (userId) => {
  const result = await pool.query(
    `
    SELECT
      id,
      name,
      email,
      picture
    FROM users
    WHERE id = $1
    `,
    [userId]
  );

  return result.rows[0];
};

export default getCurrentUserService;