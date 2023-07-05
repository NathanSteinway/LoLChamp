// Primary Containers
const searchChamp = document.getElementById('searchForm')
const champName = document.getElementById('champ-name')
const champGrid = document.getElementById('champGrid')
const champContainer = document.getElementById('champContainer')
const roleContainer = document.getElementById('roleContainer')
const roleBtnContainer = document.getElementById('roleBtnContainer')

// Class Sorting Btns
const classBtns = document.querySelectorAll('.classBtn')

let currentSelect = {}

const getAllChamps = () => {

  axios.get('/lol/champion')
    .then(res => {

      let champsArr = res.data

      Object.values(champsArr).forEach(function buildPage(item) {

        let newItem = document.createElement("div")

        newItem.innerHTML = `
        
        <img id="${item.id}" onclick="getChamp(event, '${item.id}')" class='newChamp' src="http://ddragon.leagueoflegends.com/cdn/13.13.1/img/champion/${item.id}.png">
        
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

        searchChamp.style.display = "none"
        champName.style.display = "none"

        for(let i = 0; i < classBtns.length; i++){
          classBtns[i].style.display = "none"
        }

        champContainer.innerHTML = `
          <div>
            <div class="splash-container">
              <h1 class="splash-title">${champ}</h1>
              <img class="splash" src='http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champ}_0.jpg'>
            </div>
            
            <div class="champContent">

              <div class="champSpells">
                  <div class="passive">
                    <img class="spellIcon" onclick="displayDetails(event, 'passiveDetails')" src="http://ddragon.leagueoflegends.com/cdn/13.13.1/img/passive/${currentSelect.passive.image.full}">
                  </div>                
                  
                  <div class="Q">
                    <img id="Q" class="spellIcon" onclick="displayDetails(event, 'qDetails')" src="http://ddragon.leagueoflegends.com/cdn/13.13.1/img/spell/${currentSelect.spells[0].image.full}">
                  </div>

                  <div class="W">
                    <img id="W" class="spellIcon" onclick="displayDetails(event, 'wDetails')" src="http://ddragon.leagueoflegends.com/cdn/13.13.1/img/spell/${currentSelect.spells[1].image.full}">
                  </div>

                  <div class="E">
                    <img id="E" class="spellIcon" onclick="displayDetails(event, 'eDetails')" src="http://ddragon.leagueoflegends.com/cdn/13.13.1/img/spell/${currentSelect.spells[2].image.full}">
                  </div>
                  <div class="R">
                    <img id="R" class="spellIcon" onclick="displayDetails(event, 'rDetails')" src="http://ddragon.leagueoflegends.com/cdn/13.13.1/img/spell/${currentSelect.spells[3].image.full}">
                  </div>

                  <div class="champTips">
                    <h1>Ally Tips</h1>
                      <p>
                        ${currentSelect.allytips[0]}
                        <br>
                        <br>
                        ${currentSelect.allytips[1]}
                        <br>
                        <br>
                        ${currentSelect.allytips[2]}
                      </p>
                  </div>

                  <div class="champTips">
                  <h1>Enemy Tips</h1>
                    <p>
                      ${currentSelect.enemytips[0]}
                      <br>
                      <br>
                      ${currentSelect.enemytips[1]}
                      <br>
                      <br>
                      ${currentSelect.enemytips[2]}
                    </p>
                </div>

              </div>

              <div class="spellDetailsContainer">
              <p id="passiveDetails" class="spellDetails">${currentSelect.passive.description}</p>
              <p id="qDetails" class="spellDetails">${currentSelect.spells[0].description}</p>
              <p id="wDetails" class="spellDetails">${currentSelect.spells[1].description}</p>
              <p id="eDetails" class="spellDetails">${currentSelect.spells[2].description}</p>
              <p id="rDetails" class="spellDetails">${currentSelect.spells[3].description}</p>
            </div>
            </div>
              
          </div>
        `
      })
}

const displayDetails = (event, id) => {

  let x = document.getElementById(`${id}`);
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}


const getChampByName = (evt) => {
  evt.preventDefault()
  axios.get(`/lol/champion/name/${champName.value}`)
    .then( res => {
      let champIcons = document.querySelectorAll('.newChamp')
      console.log(res.data)
      let champNames = []

      for(let i = 0; i < res.data.length; i++){
        champNames.push(res.data[i].id)
      }

      for(let i = 0; i < champIcons.length; i++){
        if(!champNames.includes(champIcons[i].id)){
          if(!champIcons[i].classList.contains('fadeaway')){
            champIcons[i].classList.add('fadeaway')
          }
          
          champIcons[i].addEventListener('transitionend', (evt) => {
            champIcons[i].style.display='none'
          })
        } else {
          champIcons[i].classList.remove('fadeaway')
          champIcons[i].style.display='block'
        }

      }
    })
    .catch(err => console.log(err))
}

const getChampByClass = (evt) => {

  evt.preventDefault()

  // evt is an object w/ info about the object
  // target being one of them
  // evt.target is accessing target key on evt obj
  // destructuring it lets us set it to something else if you click img instead of btn

  let {target} = evt

  // images have no id, so if element is clicked and does not have an id, it will know that we wanted to click the button

  if(target.id === ''){
    target = target.parentNode
  }

  console.log(target.id)

  axios.get(`/lol/champion/tags/${target.id}`)
  .then( res => {

    let champIcons = document.querySelectorAll('.newChamp')

    console.log(res.data)
    let champNames = []
    for(let i = 0; i < res.data.length; i++){
      champNames.push(res.data[i].id)
    }

    for(let i = 0; i < champIcons.length; i++){
      if(!champNames.includes(champIcons[i].id)){
        if(!champIcons[i].classList.contains('fadeaway')){
          champIcons[i].classList.add('fadeaway')
        }
        
        champIcons[i].addEventListener('transitionend', (evt) => {
          champIcons[i].style.display='none'
        })
      } else {
        champIcons[i].classList.remove('fadeaway')
        champIcons[i].style.display='block'
      }

    }
  })
}

getAllChamps()
searchChamp.addEventListener('submit', getChampByName)

// Btn event listeners
console.log(classBtns)
for(let i = 0; i < classBtns.length; i++) {
  classBtns[i].addEventListener('click', getChampByClass)
}
