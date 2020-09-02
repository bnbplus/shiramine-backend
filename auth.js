const jwt    = require('jsonwebtoken')
const config = require('./config/jwtConfig')

module.exports = function auth(req, res, next) {

    // トークンの有無を確認
    if ( !req.headers.authorization ) {
        return res.status(403).send({
            success: false,
            message: 'no token provided.'
        })
    }
    
    const token = req.headers.authorization.replace(/\s+/g, '')
    
    // トークンを識別&ダメなら弾く
    try {
        const decoded = jwt.verify(token, config.jwt.secret)
        req.jwtPayload = decoded
        next()
    } catch (err) {
        return res.status(401).json({
            success: false,
            message: 'not authenticated.'
        })
    }
    
}