import pool from "../../config/db.js";
import generateJwtService from "./generateJwtService.js";
import verifyGoogleTokenService from "./verifyGoogleTokenService.js";

const loginWithGoogleService = async (idToken) => {
  // 1. Verify Google Token
  const googleUser = await verifyGoogleTokenService(idToken);

  // 2. Check if user already exists
  const existingUser = await pool.query(
    `
  SELECT
      id,
      email,
      name,
      picture,
      provider,
      provider_id
  FROM users
  WHERE provider = $1
    AND provider_id = $2
  `,
    ["google", googleUser.providerId],
  );

  let user;

  if (existingUser.rowCount) {
    user = existingUser.rows[0];
  } else {
    const result = await pool.query(
      `
    INSERT INTO users
      (email, name, picture, provider, provider_id)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING
      id,
      email,
      name,
      picture,
      provider,
      provider_id
    `,
      [
        googleUser.email,
        googleUser.name,
        googleUser.picture,
        "google",
        googleUser.providerId,
      ],
    );

    user = result.rows[0];
  }

  const token = generateJwtService(user);

  return {
    user,
    token,
  };
};

export default loginWithGoogleService;
