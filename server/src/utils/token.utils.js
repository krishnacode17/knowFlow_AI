
const jwt = require("jsonwebtoken");

const generateAccessToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" }
  );
};

const generateRefreshToken = ({ userId, refreshExpiresAt }) => {
  const remainingSeconds = Math.floor(
    (refreshExpiresAt - Date.now()) / 1000
  );

  if (!userId || !refreshExpiresAt || remainingSeconds <= 0) {
    throw new Error("Invalid refresh token data or expiry");
  }

  return jwt.sign(
    { userId, refreshExpiresAt },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: remainingSeconds }
  );
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
};
