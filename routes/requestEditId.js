const models = require('../models/index')

module.exports = async (req, res) => {

    let param = {}

    // {
    //     userId: number || null,
    //     information: string || null,
    //     solutioner: number || null
    // }

    if ( !!req.body.userId ) {
        param['userId'] = req.body.userId
    }

    if ( !!req.body.information ) {
        if ( req.body.information.length > 1000 ) {
            return res.status(400).json({
                success: false,
                message: 'information is too long.'
            })
        }
        param['information'] = req.body.information
    }

    if ( !!req.body.solutioner ) {
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