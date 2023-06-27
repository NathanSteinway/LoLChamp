const searchBtn = document.querySelector('button')

const getChamp = () => {
    
    axios.get(`/lol/champion`)
        .then(res => {
          console.log(res.data)
          alert(res.data.name)
        })
}

searchBtn.addEventListener('click', getChamp)

