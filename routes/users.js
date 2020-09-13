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

    // 必要な情報のみ抽出
    records = records
    .map( c => {
        return {
            id: c.id,
            name: c.name,
            email: c.email,
            role: c.role,
            bleUuid: c.bleUuid,
            createdAt: c.createdAt,
            updatedAt: c.updatedAt,
        }
    } )
    
    return res.status(200).json({
        success: true,
        records: records
    })
}