const pokemonCount = 905;
var pokedex = {}
var direito = document.getElementsByClassName('rightSide')
direito = direito[0]
var esquerdo = document.getElementsByClassName('leftSide')
esquerdo = esquerdo[0]
var main = document.getElementsByClassName('mainGrid')
main = main[0]

window.onload = async function(){
    for (let i = 1; i < pokemonCount; i++) {
        await getPokemon(i)
        let pokemon = document.createElement('div')
        pokemon.id = i
        pokemon.innerText = pokedex[i]['name'].toUpperCase()
        pokemon.classList.add('pokemonCard')
        let types = pokedex[i]['types']
          pokemon.classList.add(types[0]['type']['name'].toLowerCase())
        pokemon.addEventListener('click',updatePokemon)
        direito.appendChild(pokemon)
        
    }
}

async function getPokemon (num){
    let url = 'https://pokeapi.co/api/v2/pokemon/'+ num.toString()
    let res = await fetch(url)
    let pokemon = await res.json()
    let pokemonName = pokemon['name']
    let pokemonTypes = pokemon['types']
    let pokemonImg = pokemon['sprites']['front_default']
    
    res = await fetch(pokemon['species']['url'])
    let pokemonDsc = await res.json()
    pokemonDsc = pokemonDsc['flavor_text_entries'][Math.floor(Math.random()*11)]['flavor_text']
    let pokemonStats = pokemon['stats']
    pokedex[num] = {"name":pokemonName,'img':pokemonImg,'types':pokemonTypes,'desc':pokemonDsc,'stats':pokemonStats}

}

function updatePokemon(){
    main.classList.remove('normal','ground','fire','water','ice','dark','steel','poison','psychic','ghost','electric','fairy','rock','grass','bug','fighting','dragon')
    document.getElementById('pokemonImg').src = pokedex[this.id]['img']
    let statsDiv = document.getElementById('pokemonStats')
    let typesDiv = document.getElementById('pokemon-type')
    // remove os tipos do pokemon anterior
    while(typesDiv.firstChild){
    typesDiv.firstChild.remove()
    }
    // remove os status do pokemon anterior
    while(statsDiv.firstChild){
      statsDiv.firstChild.remove()
      }
    let stats = pokedex[this.id]['stats']
    //gera os elementos de status
    for(let i = 0;i < stats.length;i++){
        let stat = document.createElement('div')
        stat.innerText = stats[i]['stat']['name'].toUpperCase() +':'
        stat.innerText += stats[i]['base_stat']
        stat.classList.add('statsBox')
        statsDiv.appendChild(stat)
    }
    //gera os elementos de tipo
    let types = pokedex[this.id]['types']
    main.classList.add(types[0]['type']['name'].toLowerCase())
    for(let i = 0; i < types.length;i++){
        let type = document.createElement('span')
        type.innerText = types[i]['type']['name'].toUpperCase()
        type.classList.add('typeBox')
        typesDiv.appendChild(type)
    }
    document.getElementById('pokemonDescript').innerText = pokedex[this.id]['desc']
    document.getElementById('pokemon-name').innerText = pokedex[this.id]['name'].toUpperCase()

}

function myFunction() {
    input = document.getElementById('myInput');
    filter = input.value.toUpperCase();
    li = document.getElementsByClassName('pokemonCard');
    for (i = 0; i < li.length; i++) {
      txtValue = li[i].innerText;
      if (txtValue.toUpperCase().indexOf(filter)  > -1) {
        li[i].style.display = "";
      } else {
        li[i].style.display = "none";
      }
    
  }
}



