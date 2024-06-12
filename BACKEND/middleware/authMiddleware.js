const jwt = require('jsonwebtoken');// Importing jsonwebtoken
const JWT_SECRET = process.env.JWT_SECRET;// Importing JWT_SECRET from .env file
const User = require('../models/User');// Importing User model

const authMiddleware = (req, res, next) => {// Middleware function to authenticate user
    const token = req.headers.authorization?.split(' ')[1];// Extracting token from request headers
    if (!token) {// If token is not provided
        return res.status(401).json({ message: 'Access denied. No token provided.' });// Return error message
    }

    try {// Try to decode token
        const decoded = jwt.verify(token, JWT_SECRET);// Decode token
        req.user = decoded;// Set user in request object
        next();// Call next middleware
    } catch (error) {// If token is invalid
        res.status(401).json({ message: 'Invalid token.' });// Return error message
    }
};

module.exports = authMiddleware;// Export authMiddleware