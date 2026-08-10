import logger from "../config/logger.js";

const errorMiddleware = (
  err,
  req,
  res,
  _next,
) => {
  logger.error({
    err,
    requestId: req.requestId,
    userId: req.user?.id,
  });

  const statusCode = err.isOperational
    ? err.statusCode
    : 500;

  const message = err.isOperational
    ? err.message
    : "Internal Server Error";

  return res.status(statusCode).json({
    success: false,
    message,
  });
};

export default errorMiddleware;