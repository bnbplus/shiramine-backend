const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

require('dotenv').config()

const port = 3000

app.get('/', (req, res) => {
    return res.json({
        message: 'This is the Shiramine API. You have successfully connected.',
    })
})


app.listen( port, _ => console.log(`Listening on port ${port}`) )