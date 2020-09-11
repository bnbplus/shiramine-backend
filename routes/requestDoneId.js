const models = require('../models/index')

module.exports = async (req, res) => {

    let param = {}

    if ( !!req.body.id ) {
        param['id'] = req.body.id
    }

    if ( !!req.body.solutioner ) {
        if ( req.body.solutioner.length > 50 ) {
            return res.status(400).json({
                success: false,
                message: 'information is too long.'
            })
        }
        param['solutioner'] = req.body.solutioner
    }

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