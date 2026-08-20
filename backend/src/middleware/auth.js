const jwt = require('jsonwebtoken');
const logger = require('../config/logger');

/**
 * Verify JWT and attach user to req.user.
 * Optionally restrict to a specific role.
 */
function authenticate(role) {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token provided' });
    }
    const token = authHeader.slice(7);
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      if (role && payload.role !== role) {
        return res.status(403).json({ error: 'Forbidden: insufficient role' });
      }
      req.user = payload;
      next();
    } catch (err) {
      logger.warn('JWT verification failed', { error: err.message });
      return res.status(401).json({ error: 'Invalid or expired token' });
    }
  };
}

const requireClient = authenticate('client');
const requireAdmin = authenticate('admin');
const requireAuth = authenticate(); // any authenticated user

module.exports = { authenticate, requireClient, requireAdmin, requireAuth };
