const models = require('../models/index')
const spots = require('./spots')

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
        !req.body.name               ||
        !req.body.bleUuid            ||
        !req.body.bnbSub             ||
        !req.body.latitude           ||
        !req.body.longitude          ||
        !req.body.description
    ) {
        return res.status(400).json({
            success: false,
            message: 'wrong input field.'
        })
    }

    // 名前の長さを判定
    if ( req.body.name > 100 ) {
        return res.status(400).json({
            success: false,
            message: 'name is too long.'
        })
    }

    // 説明の長さの判定
    if ( req.body.description > 1000 ) {
        return res.status(400).json({
            success: false,
            message: 'name is too long.'
        })
    }

    const name = req.body.name
    const bleUuid = req.body.bleUuid
    const bnbSub = req.body.bnbSub
    const latitude = req.body.latitude
    const longitude = req.body.longitude
    const description = req.body.description

    try {
        await models.spot.create({
            name,
            bleUuid,
            bnbSub,
            latitude,
            longitude,
            description
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