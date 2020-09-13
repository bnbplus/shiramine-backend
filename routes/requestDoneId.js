const models = require('../models/index')

module.exports = async (req, res) => {

    let param = {}

    if ( !req.body.solutioner ) {
        return res.status(400).json({
            success: false,
            message: 'wrong input field.'
        })
    }
    param['solutioner'] = req.body.solutioner



    try {
        console.log(param);
        await models.request.update(param, { where: { id: req.params.id } })
        return res.json({
            success: true,
            message: 'database change completed.'
        })
    } catch ( err ) {
        return res.status(500).json({
            success: false,
            message: 'database is corrupted.'
        })
    }

}