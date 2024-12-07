require('dotenv').config();
const jwt = require('jsonwebtoken');

const auth  = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).json({ message: 'Token not provided' });

    try {
        const decoded = jwt.verify(token.split(' ')[1], process.env.SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = {auth};