const models = require('../models/index')

module.exports = async (req, res) => {
    
    let records = []
    try {
        records = await models.user.findAll({
            raw: true,
        })
    } catch (err) {
        // データベースの故障
        return res.status(500).json({
            success: false,
            message: 'database is corrupted.'
        })
    }
    
    return res.status(200).json({
        success: true,
        records: records
    })
}