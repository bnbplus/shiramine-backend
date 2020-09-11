const models = require('../models/index')

module.exports = async (req, res) => {

    let record = null
    try {
        record　= await models.request.findOne({ where: { id: req.params.id } })
        if (record === null) {
            return res.status(400).json({
                success: false,
                message: 'your id is wrong'
            }) 
        }
    } catch (err) {
        // データベースの故障
        return res.status(500).json({
            success: false,
            message: 'database is corrupted.'
        })
    }

    // 必要なデータのみ抽出
    record = {
        id: record.id,
        userId: record.userId,
        information: record.information
    }

    return res.status(200).json({
        success: true,
        record: record
    })
}