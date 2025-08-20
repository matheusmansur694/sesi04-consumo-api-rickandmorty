//https://rickandmortyapi.com/api/character

const pageInput = document.getElementById("pageInput");
const searchBtn = document.getElementById("searchBtn");
const resultsDIv = document.getElementById("results");

async function fetchCaracters(page){
    resultsDIv.innerHTML = "<p>Carregando..</p>"

    try {
        const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`)
        const data = await response.json()
        //console.log(data)

        if(data.error){
            resultsDIv.innerHTML = "<p>Página inválida!</p>"
            return
        }

        resultsDIv.innerHTML = "";
        data.results.forEach(character => {
            const card = document.createElement("div")
            card.className = "card"
            card.innerHTML = `
                <img src="${character.image}">
                <h3>${character.name}</h3>
                <p><strong>Status:</strong> ${character.status}</p>
                <p><strong>Espécie:</strong> ${character.species}</p>
            `
            resultsDIv.appendChild(card)
        });

} catch (error) {
       resultsDIv.innerHTML = "<p>Erro ao buscar personagens!</p>" 
    }
}

searchBtn.addEventListener("click", () => {
    const page = pageInput.value.trim()
    if (page){
        fetchCaracters(page)
    }else{
        resultsDIv.innerHTML = "<p>Digite um número de página!</p>"
    }
})

fetchCaracters(1)