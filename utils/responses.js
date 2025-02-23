/**
 * 请求成功
 * @param res
 * @param message
 * @param data
 * @param code
 */
function success(res, message, data = {}, code = 200) {
  res.status(code).json({
    status: true,
    message,
    data,
  });
}

/**
 * 请求失败
 * @param res
 * @param error
 */
function failure(res, error) {
  if (error.name === "SequelizeValidationError") {
    const errors = error.errors.map((e) => e.message);
    return res.status(400).json({
      status: false,
      message: "Request parameter error",
      errors,
    });
  }

  if (error.name === "BadRequestError") {
    return res.status(400).json({
      status: false,
      message: "Request error",
      errors: [error.message],
    });
  }

  if (error.name === "UnauthorizedError") {
    return res.status(401).json({
      status: false,
      message: "Authentication failure",
      errors: [error.message],
    });
  }

  if (error.name === "NotFoundError") {
    return res.status(404).json({
      status: false,
      message: "Resource does not exist",
      errors: [error.message],
    });
  }

  res.status(500).json({
    status: false,
    message: "Server Error",
    errors: [error.message],
  });
}

module.exports = {
  success,
  failure,
};
