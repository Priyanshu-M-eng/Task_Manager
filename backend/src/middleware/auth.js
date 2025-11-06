const { verifyToken } = require('../utils/jwtUtils');
const { sendError } = require('../utils/responseUtils');
const User = require('../models/User');

/**
 * Middleware to authenticate users via JWT
 */
const authenticate = async (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return sendError(res, 401, 'No token provided, authorization denied');
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      return sendError(res, 401, 'No token provided, authorization denied');
    }

    // Verify token
    const decoded = verifyToken(token);

    // Check if user exists
    const user = await User.findById(decoded.id);

    if (!user) {
      return sendError(res, 401, 'User not found');
    }

    if (!user.isActive) {
      return sendError(res, 401, 'User account is deactivated');
    }

    // Attach user to request
    req.user = {
      id: user._id,
      email: user.email,
      role: user.role,
    };

    next();
  } catch (error) {
    return sendError(res, 401, 'Token is invalid or expired');
  }
};

/**
 * Middleware to check user roles
 * @param  {...String} roles - Allowed roles
 */
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return sendError(res, 401, 'User not authenticated');
    }

    if (!roles.includes(req.user.role)) {
      return sendError(
        res,
        403,
        `Access denied. Required role: ${roles.join(' or ')}`
      );
    }

    next();
  };
};

module.exports = {
  authenticate,
  authorize,
};
