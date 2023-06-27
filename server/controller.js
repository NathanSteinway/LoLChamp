require('dotenv').config()
const axios = require('axios')
const {API_KEY} = process.env

module.exports = {

    getChamp: (req, res) => {
        axios.get(`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/GamRK1dGamrGamin/?api_key=${API_KEY}`)
            .then(response => {
                res.status(200).send(response.data)
            })
            .catch(err => console.log(err))
    }

}