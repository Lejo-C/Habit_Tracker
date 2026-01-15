const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get user from the token
            const user = await User.findById(decoded.id).select('-password');

            if (!user) {
                return res.status(401).json({ message: 'Not authorized, user not found' });
            }

            // Single Session Check
            // In a real app, you might compare token 'iat' (issued at) with user.lastLogout
            // Or store the current valid token signature in the DB (like sessionToken in our model)
            // Here we check if the user has a sessionToken and if it matches roughly or if we want strict single device
            // Strict single device:
            /*
            if (user.sessionToken && user.sessionToken !== token) {
                 return res.status(401).json({ message: 'Session expired, logged in on another device' });
            }
            */
            // Ideally we store the current valid session ID in the DB.
            // For this implementation, let's assume we store the signature or the whole token in 'sessionToken' field on login.

            // NOTE: To enable single device login as requested:
            // "Single device login enforcement (invalidate old session if new login occurs)."
            // user.sessionToken should be updated on Login.

            // Let's implement that check if the field is populated
            if (user.sessionToken && user.sessionToken !== token) {
                return res.status(401).json({ message: 'Not authorized, logged in on another device.' });
            }

            req.user = user;
            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

const admin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(401).json({ message: 'Not authorized as an admin' });
    }
};

module.exports = { protect, admin };
