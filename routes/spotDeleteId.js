const models = require('../models/index')

module.exports = async (req, res) => {

    // admin以外弾く
    if ( req.jwtPayload.role != 'admin' ) {
        return res.status(401).json({
            success: false,
            message: 'no access rights.'
        })
    }

    try {
        // データベースにemialがあるか検出
        await models.spot.destroy({ where: { id: req.params.id } })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'database is corrupted.'
        })
    }

    return res.status(200).json({
        success: true,
        message: 'delete complete.'
    })
    
}