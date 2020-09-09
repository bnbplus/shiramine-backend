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
const userId = require('./routes/userId')
const userDeleteId = require('./routes/userDeleteId')
const userEditId = require('./routes/userEditId')
const spots = require('./routes/spots')
const spotsCreate = require('./routes/spotCreate')

require('dotenv').config()

const port = 4000

// expressの設定
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// CORSを許可
app.use((req, res, next) => {
    // FIXME: セキュリティなんとかせねば
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', '*')
    next()
})

/** 接続検証用 */
app.get('/', index)

/** ログイン */
app.post('/login', login)

/** ユーザの一覧 */
app.get('/users', auth, users)

/** idユーザの閲覧 */
app.get('/user/:id([0-9]+)', auth, userId)

/** ユーザ本人の情報 */
app.get('/user', auth, user)

/** ユーザの作成 */
app.post('/user/create', auth, userCreate)

/** ユーザの削除 */
app.get('/user/delete/:id([0-9]+)', auth, userDeleteId)

/** ユーザの編集 */
app.post('/user/edit/:id([0-9]+)', auth, userEditId)

/** スポットの作成 */
app.get('/spots', auth, spots)

/** スポットの作成 */
app.post('/spot/create', auth, spotsCreate)

app.get('/test', auth, (req, res) => {
    return res.status(200).json({
      message: 'Hello!',
      authEmail: req.jwtPayload.email,
    })
})

app.listen( port, _ => console.log(`Listening on port ${port}`) )