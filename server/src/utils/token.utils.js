const jwt = require("jsonwebtoken");
const { randomUUID } = require("crypto");

const generateAccessToken = (userId, jti) => {
  return jwt.sign(
    { userId, jti },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" }
  );
};

const generateRefreshToken = ({userId,refreshExpiresAt,jti = randomUUID(),}) => {
  const remainingSeconds = Math.floor((refreshExpiresAt - Date.now()) / 1000);

  if (!userId || !refreshExpiresAt || remainingSeconds <= 0) {
    throw new Error("Invalid refresh token data or expiry");
  }

  return jwt.sign(
    { userId, refreshExpiresAt, jti },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: remainingSeconds },
  );
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
};
