const models = require('../models/index')
const bcrypt = require('bcrypt')
const emailValidator = require("email-validator")

module.exports = async (req, res) => {

    // admin以外弾く
    if ( req.jwtPayload.role != 'admin' ) { 
        return res.status(401).json({
            success: false,
            message: 'no access rights.'
        })
    }

    let param = {}

    // {
    //     name: string || null,
    //     bleUuid: string || null,
    //     bnbSub: string || null,
    //     latitude: number || null,
    //     longitude: number || null,
    //     description: string || null,
    // }

    if ( !!req.body.name ) {
        if ( req.body.name.length > 100 ) {
            return res.status(400).json({
                success: false,
                message: 'name is too long.'
            })
        }
        param['name'] = req.body.name
    }

    if ( !!req.body.bleUuid ) {
        param['bleUuid'] = req.body.bleUuid
    }

    if ( !!req.body.bnbSub ) {
        param['bnbSub'] = req.body.bnbSub
    }

    if ( !!req.body.latitude ) {
        param['latitude'] = req.body.latitude
    }

    if ( !!req.body.longitude ) {
        param['longitude'] = req.body.longitude
    }

    if ( !!req.body.description ) {
        param['description'] = req.body.description
    }

    try {
        await models.spot.update(param, { where: { id: req.params.id } })
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