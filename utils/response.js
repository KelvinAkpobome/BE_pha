/* eslint-disable implicit-arrow-linebreak */

class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

const errorResMsg = (res, code, message) =>
  res.status(code).json({
    status: 'error',
    error: message,
  });

const successResMsg = (res, code, data) =>
  res.status(code).json({
    status: 'success',
    data,
  });

const sessionSuccessResMsg = (res, message, code, token, user) =>
  res.status(code).json({
    status: 'success',
    message,
    data: {
      authenticated: true,
      token,
      user,
    },
  });

module.exports.AppError = AppError;
module.exports.errorResMsg = errorResMsg;
module.exports.successResMsg = successResMsg;
module.exports.sessionSuccessResMsg = sessionSuccessResMsg;
