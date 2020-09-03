const models = require('../models/index')
const bcrypt = require('bcrypt')
const emailValidator = require("email-validator")

module.exports = async (req, res) => {

    // admin以外弾く
    if ( req.jwtPayload.role != 'admin' ) { 
        return res.status(401).json({
            success: false,
            message: 'no access rights.'
        })
    }

    // 全てのフィールドがあるか確認
    if (
        !req.body.name     ||
        !req.body.email    ||
        !req.body.password ||
        !req.body.role
    ) {
        return res.status(400).json({
            success: false,
            message: 'wrong input field.'
        })
    }

    // 名前の長さで弾く
    if ( req.body.name.length > 100 ) {
        return res.status(400).json({
            success: false,
            message: 'name is too long.'
        })
    }

    // メルアドの長さで弾く
    if ( req.body.email.length > 200 ) {
        return res.status(400).json({
            success: false,
            message: 'email is too long.'
        })
    }

    // パスワードの最長文字数制限
    if ( req.body.password > 200 ) {
        return res.status(400).json({
            success: false,
            message: 'password is too long.'
        })
    }

    // パスワード短すぎはよくない
    if ( req.body.password <= 3 ) {
        return res.status(400).json({
            success: false,
            message: 'password is too short.'
        })
    }

    // メルアドのフォーマットの確認
    if ( !emailValidator.validate(req.body.email) ) {
        return res.status(400).json({
            success: false,
            message: 'email format is different.'
        })
    }

    // roleに変なものが入っていないか確認
    switch (req.body.role) {
        case 'admin':
        case 'traveller':
        case 'keyperson':
            break
        default:
            return res.status(400).json({
                success: false,
                message: 'role is admin, traveller, keyperson only.'
            })
    }

    let record = null
    try {
        // データベースにemialがあるか検出
        record　= await models.user.findOne({ where: { email: req.body.email } })
        console.log(record　);
        if ( !!record ) {
            return res.status(400).json({
                success: false,
                message: 'email is not unique.'
            })
        }
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'database is corrupted.'
        })
    }

    const userName = req.body.name
    const userEmail = req.body.email
    const userPassword = bcrypt.hashSync(req.body.password, 10)
    const userRole = req.body.role

    try {
        await models.user.create({
            name: userName, 
            email: userEmail,
            password: userPassword,
            role: userRole
        })
        return res.json({
            success: true,
            message: 'database registration completed.'
        })
    } catch ( err ) {
        return res.status(500).json({
            success: false,
            message: 'database is corrupted.'
        })
    }

}