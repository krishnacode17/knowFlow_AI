const errorMiddleware = (err, req, res, next) => {
  console.error("API Error:", {
    message: err.message,
    method: req.method,
    url: req.originalUrl,
  });

  // Invalid MongoDB ObjectId
  if (err.name === "CastError") {
    return res.status(400).json({
      success: false,
      message: "Invalid ID format",
    });
  }

  // Mongoose schema validation errors
  if (err.name === "ValidationError") {
    return res.status(400).json({
      success: false,
      message: "Data validation failed",
    });
  }

  // MongoDB duplicate key error
  if (err.code === 11000) {
    return res.status(409).json({
      success: false,
      message: "Duplicate value already exists",
    });
  }

  const statusCode = err.statusCode || 500;

  return res.status(statusCode).json({
    success: false,
    message:
      statusCode === 503
        ? err.message
        : statusCode >= 500
          ? "Internal server error"
          : err.message,
  });
};

module.exports = errorMiddleware;
