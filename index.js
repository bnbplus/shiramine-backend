const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const models = require('./models/index')
const config = require('./config/jwtConfig')
const auth = require('./auth')

const index = require('./routes/index')
const login = require('./routes/login')
const users = require('./routes/users')
const user = require('./routes/user')
const userCreate = require('./routes/userCreate')

require('dotenv').config()

// expressの設定
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

/** 接続検証用 */
app.get('/', index)

/** ログイン */
app.post('/login', login)

/** ユーザの一覧 */
app.get('/users', auth, users)

/** ユーザ本人の情報 */
app.get('/user', auth, user)

/** ユーザの作成 */
app.post('/user/create', auth, userCreate)

app.get('/test', auth, (req, res) => {
    return res.status(200).json({
      message: 'Hello!',
      authEmail: req.jwtPayload.email,
    })
})

app.listen( port, _ => console.log(`Listening on port ${port}`) )