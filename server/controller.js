require('dotenv').config()
const axios = require('axios')
const {API_KEY} = process.env

module.exports = {

    getChamp: (req, res) => {

        let { name } = req.params

        axios.get(`http://ddragon.leagueoflegends.com/cdn/13.13.1/data/en_US/champion/${name}.json?api_key=${API_KEY}`)
            .then(response => {
                let result = response.data
                res.status(200).send(result.data)
            })
            .catch(err => console.log(err))
    }

}