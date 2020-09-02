const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const models = require('./models/index.js')
const config = require('./config/jwtConfig')
const auth = require('./auth')

require('dotenv').config()

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// CORSを許可
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
})

const port = 3001

app.get('/', (req, res) => {

    return res.json({
        success: true,
        message: 'this is the Shiramine API. You have successfully connected.',
    })

})

app.post('/login', async (req, res) => {

    // email & password が存在しているか
    if ( !req.body.email || !req.body.password ) {
        return res.status(400).json({
            success: false,
            message: 'you have not sent an email address or password.'
        })
    }

    let record = null
    try {
        // データベースにemialがあるか検出
        record　= await models.user.findOne({ where: { email: req.body.email } })
        if (record === null) {
            return res.status(400).json({
                success: false,
                message: 'your email is incorrect.'
            }) 
        }
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'database is corrupted.'
        })
    }

    const userId = record.id
    const userEmail = req.body.email
    const userName = record.name
    const userPassword = record.password
    const userRole = record.role

    // パスワードがあっているか確認
    if ( !bcrypt.compareSync( req.body.password, userPassword ) ) {
        return res.status(400).json({
            success: false,
            message: 'your password is incorrect.'
        }) 
    }
    
    // トークンの作成
    const payload = {
        id: userId,
        email: userEmail,
        name: userName,
        role: userRole,
    }
    const token = jwt.sign(payload, config.jwt.secret, config.jwt.options)
    return res.json({
        success: true,
        message: `welcom to shiramine!, ${userName}!`,
        token: token
    })

})

app.get('/users', auth, async (req, res) => {

    // admin以外弾く
    if ( req.jwtPayload.role != 'admin' ) { 
        return res.status(401).json({
            success: false,
            message: 'no access rights.'
        })
    }
    
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
            bleToken: c.bleToken,
            createdAt: c.createdAt,
            updatedAt: c.updatedAt,
        }
    } )
    
    return res.status(200).json({
        userp: req.jwtPayload,
        records: records
    })
})

app.get('/test', auth, (req, res) => {
    return res.status(200).json({
      message: 'Hello!',
      authEmail: req.jwtPayload.email,
    })
})

app.listen( port, _ => console.log(`Listening on port ${port}`) )