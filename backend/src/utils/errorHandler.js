class ErrorHandler {
  static handleError(err, req, res, next) {
    const errorDetails = {
      message: err.message || 'An unexpected error occurred',
      statusCode: err.statusCode || 500,
      details: err.details || []
    };

    if (process.env.NODE_ENV === 'development') {
      console.error('Error:', errorDetails);
    }

    res.status(errorDetails.statusCode).json({
      success: false,
      error: errorDetails.message,
      details: errorDetails.details
    });
  }

  static throwIf(condition, message, statusCode, details) {
    if (condition) {
      const error = new Error(message);
      error.statusCode = statusCode;
      error.details = details;
      throw error;
    }
  }

  static catchAsync(fn) {
    return (req, res, next) => {
      fn(req, res, next).catch((err) => ErrorHandler.handleError(err, req, res, next));
    };
  }
}

module.exports = ErrorHandler;