const errorHandler = (err, req, res, next) => {
  console.error(err);
 
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Error interno del servidor';
 
  res.status(statusCode).json({
    error: message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};
 
class AppError extends Error {
  constructor(message, statusCode = 400) {
    super(message);
    this.statusCode = statusCode;
  }
}

module.exports = { errorHandler, AppError };