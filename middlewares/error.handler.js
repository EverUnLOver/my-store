const { ValidationError } = require("sequelize");

function logErrors (error, request, response, next) {
  console.group("logErrors");
  console.error(error);
  console.groupEnd("logErrors");
  next(error);
}

function errorHandler (error, request, response, next) {
  console.group("errorHandler");
  console.error(error);
  console.groupEnd("errorHandler");
  response.status(500).json({
    message: error.message,
    stack: error.stack
  });
}

function boomErrorHandler (error, request, response, next) {
  if (error.isBoom) {
    // return response.status(error.output.statusCode).json(error.output.payload)
    const { output  } = error;
    return response.status(output.statusCode).json(output.payload);
  };
  next(error);
}

function ormErrorHandler(err, req, res, next) {
  if (err instanceof ValidationError) {
    res.status(409).json({
      statusCode: 409,
      message: err.name,
      errors: err.errors
    })
  };
  next(err);
}

module.exports = { logErrors, errorHandler, boomErrorHandler, ormErrorHandler };
