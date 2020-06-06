

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

    citySelect.innerHTML = '<option value>Selecione a Cidade</option>'
    citySelect.disabled = true

    await url.json()

    .then(cities => {
        for(city of cities){
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }

        citySelect.disabled = false
    })  
}

document.querySelector('select[name=uf]')
.addEventListener("change", getCities)


// Ítens de coleta

const itemsToCollect = document.querySelectorAll('.items-grid li')

for(let item of itemsToCollect){
    item.addEventListener('click', handleSelectedItem)
}


const collectedItems = document.querySelector('input[name=items]')

let selectedItems = []

function handleSelectedItem(event){
    const itemLi = event.target

    // adicionar ou remover classes
    itemLi.classList.toggle('selected')

    const itemId = itemLi.dataset.id

    
    // verificar se existe item selecionado se sim, pegar os itens
    const alreadySelected = selectedItems.findIndex(item => {
        const itemFound = item == itemId // Boolean
        return itemFound
    })

    // se ja estiver selecionado, tirar da seleção
    if(alreadySelected >= 0){
        const filteredItems = selectedItems.filter(item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })
        
        selectedItems = filteredItems
    }else{
        // se nao estiver selecionado adicionar a seleção
        selectedItems.push(itemId)
    }

    // atualizar o campo escondido com os itens selecionados
    collectedItems.value = selectedItems

}