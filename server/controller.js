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

    },

    getChampByClass: (req, res) => {

        console.log(req.params)
        // named after the url in server
        let { tag } = req.params
        let filteredChamps = []

        // champArr[0] is array of all champs
        // each champ in champ object do x
        // champ represents the keyname of the champion
        for(let champ in champArr[0]) {

            // for each one, grab their tags and loop through that array
            for(let i = 0; i < champArr[0][champ].tags.length; i++){
                console.log(champArr[0][champ].tags[i], `requested tag: ${tag}`)
                // if the champ's tags match the tag from req.params, push to filteredChamps
                if(champArr[0][champ].tags[i] === tag) {
                    filteredChamps.push(champArr[0][champ])
                }
            }

        }

        res.status(200).send(filteredChamps)

    }

}