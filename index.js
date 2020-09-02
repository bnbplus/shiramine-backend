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

const port = 3000

app.get('/', (req, res) => {

    return res.json({
        success: true,
        message: 'This is the Shiramine API. You have successfully connected.',
    })

})

app.post('/login', async (req, res) => {

    // email & password が存在しているか
    if ( !req.body.email || !req.body.password ) {
        return res.status(400).json({
            success: false,
            message: 'You have not sent an email address or password.'
        })
    }

    // データベースにemialがあるか検出
    const record　= await models.user.findOne({ where: { email: req.body.email } })
    if (record === null) {
        return res.status(400).json({
            success: false,
            message: 'Your email is incorrect.'
        }) 
    }

    const userId = record.id
    const userEmail = req.body.email
    const userName = record.name
    const userPassword = record.password

    // パスワードがあっているか確認
    if ( !bcrypt.compareSync( req.body.password, userPassword ) ) {
        return res.status(400).json({
            success: false,
            message: 'Your password is incorrect.'
        }) 
    }
    
    // トークンの作成
    const payload = {
        id: userId,
        email: userEmail,
        name: userName
    }
    const token = jwt.sign(payload, config.jwt.secret, config.jwt.options)
    return res.json({
        success: true,
        message: `welcom to shiramine!, ${userName}!`,
        token: token
    })

})

app.get('/test', auth, (req, res) => {
    res.status(200).json({
      message: 'Hello!',
      authEmail: req.jwtPayload.email,
    });
  })

app.listen( port, _ => console.log(`Listening on port ${port}`) )