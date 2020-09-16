const models = require('../models/index')
const bcrypt = require('bcrypt')
const emailValidator = require("email-validator")

module.exports = async (req, res) => {

    // // admin以外弾く
    // if ( req.jwtPayload.role != 'admin' ) { 
    //     return res.status(401).json({
    //         success: false,
    //         message: 'no access rights.'
    //     })
    // }

    // 全てのフィールドがあるか確認
    if (
        !req.body.name           ||
        // TODO: bnbからemailを取得する方法を質問する
        // !req.body.email       || 
        !req.body.bnbplusSubject ||
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

    // // メルアドの長さで弾く
    // if ( req.body.email.length > 200 ) {
    //     return res.status(400).json({
    //         success: false,
    //         message: 'email is too long.'
    //     })
    // }

    // // メルアドのフォーマットの確認
    // if ( !emailValidator.validate(req.body.email) ) {
    //     return res.status(400).json({
    //         success: false,
    //         message: 'email format is different.'
    //     })
    // }

    if ( req.body.bnbplusSubject.length !== 36 ) {
        return res.status(400).json({
            success: false,
            message: 'bnbplusSubject is too long or too short.'
        })
    }

    // roleに変なものが入っていないか確認
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

    try {
        await models.user.create({
            name: req.body.name,
            // email: req.body.email,
            bnbplusSubject: req.body.bnbplusSubject,
            role: req.body.role,
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