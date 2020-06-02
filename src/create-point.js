

async function populateUFs(){
    const ufSelect = document.querySelector('select[name=uf]')
    
    const response = await fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    await response.json()

    .then(states => {
        for (state of states){
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
    })                        
}

populateUFs()

async function getCities(event){
    const citySelect = document.querySelector('[name=city]')

    // Hidden
    const stateInput = document.querySelector('[name=state]')

    const ufValue = event.target.value
    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`)

    await url.json()

    .then(cities => {
        for(city of cities){
            citySelect.innerHTML += `<option value="${city.id}">${city.nome}</option>`
        }

        citySelect.disabled = false
    })  
}

document.querySelector('select[name=uf]')
.addEventListener("change", getCities)