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
const userSubs = require('./routes/userSubs.js')
const spots = require('./routes/spots')
const spotId = require('./routes/spotId')
const spotCreate = require('./routes/spotCreate')
const spotDeleteId = require('./routes/spotDeleteId')
const spotEditId = require('./routes/spotEditId')
const requests = require('./routes/requests')
const requestId = require('./routes/requestId')
const requestUserId = require('./routes/requestUserId')
const requestEditId = require('./routes/requestEditId')
const requestDoneId = require('./routes/requestDoneId')
const requestCreate = require('./routes/requestCreate')
const requestCreateUserId = require('./routes/requestCreateUserId')
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
app.get('/api/', index)

/** ログイン */
app.post('/api/login', login)

/** ユーザの一覧 */
app.get('/api/users', auth, users)

/** idユーザの閲覧 */
// FIXME: なんかうごかん
app.get('/api/userid/:id([0-9]+)', auth, userId)

// https://shiraminebs.ga/api/user/subs
// [“sub1”, “sub2”, “sub3”, “sub3”]

/** ユーザ本人の情報 */
app.get('/api/user', auth, user)

/** ユーザの作成 */
app.post('/api/user/create', userCreate)

/** ユーザの削除 */
app.get('/api/user/delete/:id([0-9]+)', auth, userDeleteId)

/** ユーザの編集 */
app.post('/api/user/edit/:id([0-9]+)', auth, userEditId)

/** ユーザのsubの一覧 */
app.get('/api/user/subs', userSubs)

/** スポットの一覧 */
app.get('/api/spots', auth, spots)

/** スポットの作成 */
app.post('/api/spot/create', auth, spotCreate)

/** スポット固有の情報 */
app.get('/api/spot/:id([0-9]+)', auth, spotId)

/** スポットの編集 */
app.post('/api/spot/edit/:id([0-9]+)', auth, spotEditId)
        
/** スポットの削除 */
app.get('/api/spot/delete/:id([0-9]+)', auth, spotDeleteId)

/** スポットの作成 */
app.post('/api/request/create', auth, requestCreate)

/** スポットの作成(URLでユーザIDを取得) */
app.post('/api/request/create/user/:id([0-9]+)', auth, requestCreateUserId)

/** 頼みごと一覧 */
app.get('/api/requests', requests)

/** ユーザごとの頼みごと */
app.get('/api/request/user/:id([0-9]+)', auth, requestUserId)

/** 頼みごと固有の情報 */
app.get('/api/request/:id([0-9]+)', auth, requestId)

/** 頼みごとの編集 */
app.post('/api/request/edit/:id([0-9]+)', auth, requestEditId)

/** 頼みごとの完了 */
app.post('/api/request/done/:id([0-9]+)', auth, requestDoneId)

/** 頼みごとの削除 */
app.get('/api/request/delete/:id([0-9]+)', auth, requestDeleteId)

app.get('/api/test', auth, (req, res) => {
    return res.status(200).json({
      message: 'Hello!',
      authEmail: req.jwtPayload.email,
    })
})

app.listen( port, _ => console.log(`Listening on port ${port}`) )