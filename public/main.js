const searchChamp = document.getElementById('searchForm')
const champName = document.getElementById('champ-name')
const champGrid = document.getElementById('champGrid')
const champContainer = document.getElementById('champContainer')
const getAllBtn = document.getElementById('all-btn')

let currentSelect = {}

const getAllChamps = () => {

  axios.get('/lol/champion')
    .then(res => {

      let champsArr = res.data

      Object.values(champsArr).forEach(function buildPage(item) {

        let newItem = document.createElement("div")

        newItem.innerHTML = `
        
        <img onclick="getChamp(event, '${item.id}')" class='newChamp' src="http://ddragon.leagueoflegends.com/cdn/13.13.1/img/champion/${item.id}.png">
        
        `

        champContainer.appendChild(newItem);

      })


    })
}

const getChamp = (evt, champ) => {

  evt.preventDefault()

  axios.get(`/lol/champion/${champ}`)
      .then(res => {

        let currentSelect = res.data[champ]
        console.log(currentSelect)

        champContainer.innerHTML = `
          <div>
            <img src='https://ddragon.leagueoflegends.com/cdn/13.13.1/img/champion/${champ}.png'>
            <br>
            ${currentSelect.lore}
            <br>
            <br>
            ${currentSelect.enemytips}
          </div>
        `

      })
}

const getChampByName = (evt) => {
  evt.preventDefault()
  axios.get(`/lol/champion/name/${champName.value}`)
    .then( res => {

      champContainer.innerHTML = ''

      res.data.forEach(function buildPage(item) {

        let newItem = document.createElement("div")

        newItem.innerHTML = `
        
        <img onclick="getChamp(event, '${item.id}')" class='newChamp' src="http://ddragon.leagueoflegends.com/cdn/13.13.1/img/champion/${item.id}.png">
        
        `

        champContainer.appendChild(newItem);

      })
    })
    .catch(err => console.log(err))
}


getAllChamps()
searchChamp.addEventListener('submit', getChampByName)
// getAllBtn.addEventListener('click', getAllChamps)
// champName.addEventListener('change', getChampByName)

