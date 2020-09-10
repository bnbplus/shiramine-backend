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
const spotId = require('./routes/spotId')
const spotCreate = require('./routes/spotCreate')
const spotDeleteId = require('./routes/spotDeleteId')
const spotEditId = require('./routes/spotEditId')
const requests = require('./routes/requests')
const request = require('./routes/requestUserId')
const requestEditId = require('./routes/requestEditId')
const requestCreate = require('./routes/requestCreate')
const requestDeleteId = require('./routes/requestDeleteId')

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
app.post('/spot/create', auth, spotCreate)

/** スポット固有の情報 */
app.get('/spot/:id([0-9]+)', auth, spotId)

/** スポットの編集 */
app.post('/spot/edit/:id([0-9]+)', auth, spotEditId)

/** スポットの削除 */
app.get('/spot/delete/:id([0-9]+)', auth, spotDeleteId)

/** スポットの作成 */
app.post('/request/create', auth, requestCreate)

/** 頼みごと一覧 */
app.get('/requests', auth, requests)

/** ユーザごとの頼みごと */
app.get('/request/user/:id([0-9]+)', auth, request)


/** 頼みごとの編集 */
app.post('/request/edit/:id([0-9]+)', auth, requestEditId)

/** 頼みごとの削除 */
app.get('/request/delete/:id([0-9]+)', auth, requestDeleteId)

app.get('/test', auth, (req, res) => {
    return res.status(200).json({
      message: 'Hello!',
      authEmail: req.jwtPayload.email,
    })
})

app.listen( port, _ => console.log(`Listening on port ${port}`) )