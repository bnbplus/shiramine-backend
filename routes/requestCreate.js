const models = require('../models/index')

module.exports = async (req, res) => {

    // admin以外弾く
    if ( req.jwtPayload.role != 'admin' ) { 
        return res.status(401).json({
            success: false,
            message: 'no access rights.'
        })
    }

    // フィールドが正しいか
    if ( 
        !req.body.userid               ||
        !req.body.information
    ) {
        return res.status(400).json({
            success: false,
            message: 'wrong input field.'
        })
    }

    // 名前の長さを判定
    if ( req.body.infomation > 1000 ) {
        return res.status(400).json({
            success: false,
            message: 'information is too long.'
        })
    }

    const userid = req.body.userid
    const information = req.body.information

    try {
        await models.spot.create({
            userid,
            information
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