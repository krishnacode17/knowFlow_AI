
const jwt = require("jsonwebtoken");
const refreshSessionModel = require("../models/refreshSession.model");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies?.accessToken;

    if (!token) {
      return res.status(401).json({
        success: false, 
        message: "Authentication required",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET
    );

    const { userId, jti } = decoded;

    if (!userId || !jti) {
      return res.status(401).json({
        success: false,
        message: "Invalid access token",
      });
    }

    const session = await refreshSessionModel.findOne({
      userId,
      jti,
      revokedAt: null,
      expiresAt: { $gt: new Date() }, 
    });

    if (!session) {
      return res.status(401).json({
        success: false,
        message: "Session expired or revoked. Please log in again.",
      });
    }

    req.userId = userId;

    next();
  } catch (error) {
    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError" ||
      error.name === "NotBeforeError"
    ) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired access token",
      });
    }

    console.error("Authentication middleware error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to authenticate request",
    });
  }
};

module.exports = authMiddleware;
