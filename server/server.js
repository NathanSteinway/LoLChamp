const express = require('express')
require('dotenv').config()
const cors = require('cors')
const path = require('path')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('public'))

const { API_KEY, SERVER_PORT } = process.env

const { getChamp, getAllChamps, getChampByName } = require('./controller')

app.get('/', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../public/index.html'))
})

// this is where you declare variable name for the param defined in main.js
app.get('/lol/champion/:name', getChamp)
app.get('/lol/champion', getAllChamps)
app.get(`/lol/champion/name/:name`, getChampByName)




app.listen(4000, () => console.log(`We livin' on ${SERVER_PORT}`))