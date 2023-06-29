const searchChamp = document.getElementById('searchForm')
const champName = document.getElementById('champ-name')
const champContainer = document.getElementById('champGrid')

let currentSelect = {}
let heroName = champName.value

const getChamp = (evt) => {

  evt.preventDefault()

  axios.get(`/lol/champion/${champName.value}`)
      .then(res => {

        let currentSelect = res.data[champName.value]
        console.log(currentSelect)

        champContainer.innerHTML = `
          <div>
            <img src='https://ddragon.leagueoflegends.com/cdn/13.13.1/img/champion/${champName.value}.png'
            <br>
            ${currentSelect.lore}
          </div>
        `

      })
}

searchChamp.addEventListener('submit', getChamp)
