import pool from "../../config/db.js";
import generateJwtService from "./generateJwtService.js";
import verifyGoogleTokenService from "./verifyGoogleTokenService.js";

const loginWithGoogleService = async (idToken) => {
  // 1. Verify Google Token
  const googleUser = await verifyGoogleTokenService(idToken);

  // 2. Check if user already exists
  const existingUser = await pool.query(
    `SELECT *
FROM users
WHERE provider = $1
AND provider_id = $2`,
    ["google", googleUser.providerId],
  );

  // 3. If exists, return user
  if (existingUser.rows.length > 0) {
    // as user exists set up its session using jwt
    const user = existingUser.rows[0];

    const token = generateJwtService(user);

    return {
      user,
      token,
    };
  }

  // 4. Create new user
  const newUser = await pool.query(
    `INSERT INTO users
        (email, name, picture, provider, provider_id)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *`,
    [
      googleUser.email,
      googleUser.name,
      googleUser.picture,
      "google",
      googleUser.providerId,
    ],
  );

  const user = newUser.rows[0];

  const token = generateJwtService(user);

  return {
    user,
    token,
  };
};

export default loginWithGoogleService;
