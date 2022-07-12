const { validationResult } = require("express-validator");

module.exports = (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const message = result.errors.reduce(
      (current, error) => current + error.msg + " ",
      ""
    );
    let error = new Error(message);
    error.status = 400;
    throw error;
  }
  next();
};
