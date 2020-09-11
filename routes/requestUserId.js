const models = require('../models/index')

module.exports = async (req, res) => {

    let records = null
    try {
        records　= await models.request.findAll({ 
            raw: true,
            where: { id: req.params.id } 
        })
        

        if (records === null) {
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
    records = {
        id: records.id,
        userId: records.userId,
        information: records.information
    }

    return res.status(200).json({
        success: true,
        records: records
    })
}