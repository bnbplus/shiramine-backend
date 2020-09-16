const models = require('../models/index')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const config = require('../config/jwtConfig')

module.exports = async (req, res) => {

    // bnbplusSubject
    if ( !req.body.bnbplusSubject ) {
        return res.status(400).json({
            success: false,
            message: 'you have not sent an bnbplusSubject.'
        })
    }

    let record = null
    try {
        record　= await models.user.findOne({ where: { bnbplusSubject: req.body.bnbplusSubject } })
        if (record === null) {
            return res.status(400).json({
                success: false,
                message: 'your email is incorrect.'
            }) 
        }
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'database is corrupted.'
        })
    }

    // jwt 作成
    const payload = {
        id: record.id,
        email: record.email,
        name: record.name,
        role: record.role,
    }

    const token = jwt.sign(payload, config.jwt.secret, config.jwt.options)

    return res.json({
        success: true,
        message: `welcom to shiramine!, ${ record.name || record.email }!`,
        token: token,
        userId: record.id,
        role: record.role,
    })

}