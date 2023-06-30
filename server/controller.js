require('dotenv').config()
const axios = require('axios')
const {API_KEY} = process.env

let champArr = []

module.exports = {

    getAllChamps: (req, res) => {

        axios.get(`http://ddragon.leagueoflegends.com/cdn/13.13.1/data/en_US/champion.json?api_key=${API_KEY}`)
            .then(response => {

                champArr = []

                let result = response.data

                champArr.push(result.data)

                res.status(200).send(champArr[0])
            })
            .catch(err => console.log(err))
    },

    getChamp: (req, res) => {

        let { name } = req.params

        axios.get(`http://ddragon.leagueoflegends.com/cdn/13.13.1/data/en_US/champion/${name}.json?api_key=${API_KEY}`)
            .then(response => {
                let result = response.data
                res.status(200).send(result.data)
            })
            .catch(err => console.log(err))
    },

    getChampByName: (req, res) => {

        let { name } = req.params
        let filteredChamps = []

        for(let champion in champArr[0]){
            console.log(champion)
            if (champion.toLowerCase().startsWith(name.toLowerCase())){
                filteredChamps.push(champArr[0][champion])
            }
        }

        if(filteredChamps.length > 0){
            res.status(200).send(filteredChamps)
        } else {
            res.status(404).send('Champion Not Found')
        }

    }

}