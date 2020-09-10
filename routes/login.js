const models = require('../models/index')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const config = require('../config/jwtConfig')

module.exports = async (req, res) => {

    // email & password が存在しているか
    if ( !req.body.email || !req.body.password ) {
        return res.status(400).json({
            success: false,
            message: 'you have not sent an email address or password.'
        })
    }

    let record = null
    try {
        // データベースにemialがあるか検出
        record　= await models.user.findOne({ where: { email: req.body.email } })
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

    const userId = record.id
    const userEmail = req.body.email
    const userName = record.name
    const userPassword = record.password
    const userRole = record.role

    // パスワードがあっているか確認
    if ( !bcrypt.compareSync( req.body.password, userPassword ) ) {
        return res.status(400).json({
            success: false,
            message: 'your password is incorrect.'
        }) 
    }
    
    // トークンの作成
    const payload = {
        id: userId,
        email: userEmail,
        name: userName,
        role: userRole,
    }
    const token = jwt.sign(payload, config.jwt.secret, config.jwt.options)
    return res.json({
        success: true,
        message: `welcom to shiramine!, ${userName}!`,
        token: token,
        userId: userId,
        role: userRole,
    })

}