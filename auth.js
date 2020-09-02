const jwt    = require('jsonwebtoken')
const config = require('./config/jwtConfig')

module.exports = function auth(req, res, next) {
    try {
        const token = req.headers.authorization;
        console.log(token);
        const decoded = jwt.verify(token, config.jwt.secret);
        console.log(decoded);
        req.jwtPayload = decoded;
        next();
    } catch (err) {
        return res.status(401).json({
          message: 'Not authenticated'
        });
    }
};