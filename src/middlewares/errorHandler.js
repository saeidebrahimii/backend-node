function errorHandler(err, req, res) {
  console.log(err);
  const statusCode = err?.statusCode || 500;
  const message = err?.message || "Internal server error.";
  return res.status(statusCode).json({
    message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
}
module.exports = errorHandler;
