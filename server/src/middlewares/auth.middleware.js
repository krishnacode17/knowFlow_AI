const jwt = require("jsonwebtoken");

const authMiddleware =async (req, res, next) => {
  try {
    const token = req.cookies?.accessToken;


    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const decoded = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);


    req.userId = decoded.userId;

    next();

    
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired access token",
    });
  }
};


module.exports = authMiddleware