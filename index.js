const express = require('express')
const jwt = require('jsonwebtoken')
const config = require('./config/jwtConfig')
const auth = require('./auth')

require('dotenv').config()

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const port = 3000

app.get('/', (req, res) => {
    return res.json({
        message: 'This is the Shiramine API. You have successfully connected.',
    })
})

app.post('/login', (req, res) => {
    const payload = {
        email: req.body.email
    }
    const token = jwt.sign(payload, config.jwt.secret, config.jwt.options)
    const body = {
        email: req.body.email,
        token: token
    }
    res.status(200).json(body)
})

app.get('/test', auth, (req, res) => {
    res.status(200).json({
      message: 'Hello!',
      authEmail: req.jwtPayload.email,
    });
  })

app.listen( port, _ => console.log(`Listening on port ${port}`) )