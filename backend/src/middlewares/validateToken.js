const jwt = require('jsonwebtoken')
const response = require('../utils/response')

function validateToken(req, res, next) {

    const token = req.headers.authorization?.replace('Bearer', '').trim()

    const decoded = jwt.decode(token, process.env.JWT_SECRET)

    if (!decoded) {
        response()
    }

}


module.exports = validateToken

// authMiddleware.js
const jwt = require('jsonwebtoken');

function authenticate(req, res, next) {
    const token = req.cookies.token;

    if (!token) return res.status(401).json({ error: 'Not authenticated' });

    try {
        const decoded = jwt.verify(token, 'chave-secreta');
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Invalid token' });
    }
}
