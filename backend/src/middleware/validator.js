const { validationResult } = require('express-validator');
const { sendError } = require('../utils/responseUtils');

/**
 * Middleware to validate request using express-validator
 */
const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((err) => err.msg);
    return sendError(res, 400, 'Validation failed', errorMessages);
  }

  next();
};

module.exports = validate;
