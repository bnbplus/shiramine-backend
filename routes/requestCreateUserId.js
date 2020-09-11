const models = require('../models/index')

module.exports = async (req, res) => {

    // フィールドが正しいか
    if ( 
        !req.params.id            ||
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

    const userId = req.params.id
    const information = req.body.information

    try {
        await models.request.create({
            userId,
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