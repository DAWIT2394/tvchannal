// middleware/authMiddleware.js

const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.authenticateUser = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Missing token. Authentication failed' });
    }
    const decodedToken = jwt.verify(token, 'secretKey');
    req.userData = { userId: decodedToken.userId, isAdmin: decodedToken.isAdmin };
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: 'Token expired. Authentication failed' });
    }
    return res.status(401).json({ message: 'Invalid token. Authentication failed' });
  }
};


exports.checkIsAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.userData.userId);
    if (!user.isAdmin) {
      return res.status(403).json({ message: 'Access denied. You are not an admin' });
    }
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};