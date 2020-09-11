const models = require('../models/index')
const bcrypt = require('bcrypt')
const emailValidator = require("email-validator")

module.exports = async (req, res) => {

    // FIXME: 自分以外入れないようにする

    let param = {}

    // {
    //     name: string || null,
    //     email: string || null,
    //     password: string || null,
    //     role: string || null,
    //     bleUuid: string || null,
    //     bnbplusSubject: string || null,
    // }

    if ( !!req.body.name ) {
        // 名前の長さで弾く
        if ( req.body.name.length > 100 ) {
            return res.status(400).json({
                success: false,
                message: 'name is too long.'
            })
        }
        param['name'] = req.body.name
    }

    if ( !!req.body.email ) {
        // メルアドの長さで弾く
        if ( req.body.email.length > 200 ) {
            return res.status(400).json({
                success: false,
                message: 'email is too long.'
            })
        }
        // メルアドのフォーマットの確認
        if ( !emailValidator.validate(req.body.email) ) {
            return res.status(400).json({
                success: false,
                message: 'email format is different.'
            })
        }
        param['email'] = req.body.email
    }

    if ( !!req.body.password ) {
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
        param['password'] = bcrypt.hashSync(req.body.password, 10)
    }

    if ( !!req.body.role ) {
        switch (req.body.role) {
            case 'admin':
            case 'traveller':
            case 'villager':
            case 'shop':
                break
            default:
                return res.status(400).json({
                    success: false,
                    message: 'role is admin, traveller, villager, shop only.'
                })
        }
        param['role'] = req.body.role
    }

    if ( !!req.body.bleUuid ) {
        param['bleUuid'] = req.body.bleUuid
    }

    if ( !!req.body.bnbplusSubject ) {
        param['bnbplusSubject'] = req.body.bnbplusSubject
    }

    try {
        await models.user.update(param, { where: { id: req.params.id } })
        return res.json({
            success: true,
            message: 'database change completed.'
        })
    } catch ( err ) {
        return res.status(500).json({
            success: false,
            message: 'database is corrupted.'
        })
    }

}