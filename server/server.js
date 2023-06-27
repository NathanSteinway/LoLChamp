const express = require('express')
require('dotenv').config()
const cors = require('cors')
const path = require('path')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('public'))

const { API_KEY, SERVER_PORT } = process.env

const { getChamp } = require('./controller')

app.get('/', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../public/index.html'))
})

app.get('/lol/champion', getChamp)

app.listen(4000, () => console.log(`We livin' on ${SERVER_PORT}`))