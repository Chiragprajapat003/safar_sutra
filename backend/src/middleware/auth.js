const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'safarsutra_super_secret_jwt_key_2026';

/**
 * Auth Middleware
 * Verifies Bearer token in Authorization header
 */
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

  if (!token) {
    return res.status(401).json({
      error: 'Authentication required. Please provide a valid Bearer token.',
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({
      error: 'Invalid or expired authentication token.',
    });
  }
}

/**
 * Optional Auth Middleware
 * Attaches user to req if token present, but doesn't block if absent
 */
function optionalAuthenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

  if (token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded;
    } catch (err) {
      // Ignore invalid token in optional mode
    }
  }
  next();
}

module.exports = { authenticateToken, optionalAuthenticateToken, JWT_SECRET };
