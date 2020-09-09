const models = require('../models/index')

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

    // TODO: ここから
    

}