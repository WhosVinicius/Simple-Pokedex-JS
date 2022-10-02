const pokemonCount = 25;
var pokedex = {}
var direito = document.getElementsByClassName('rightSide')
direito = direito[0]
window.onload = async function(){
    for (let i = 1; i < pokemonCount; i++) {
        await getPokemon(i)
        let pokemon = document.createElement('div')
        pokemon.id = i
        pokemon.innerText = pokedex[i]['name'].toUpperCase()
        pokemon.classList.add('pokemonCard')
        pokemon.addEventListener('click',updatePokemon)
        direito.appendChild(pokemon)
        
    }
}

async function getPokemon (num){
    let url = 'https://pokeapi.co/api/v2/pokemon/'+ num.toString()
    let res = await fetch(url)
    let pokemon = await res.json()
    // console.log(pokemon)
    let pokemonName = pokemon['name']
    let pokemonTypes = pokemon['types']
    let pokemonImg = pokemon['sprites']['front_default']
    res = await fetch(pokemon['species']['url'])
    let pokemonDsc = await res.json()
    pokemonDsc = pokemonDsc['flavor_text_entries'][Math.floor(Math.random()*11)]['flavor_text']
    let pokemonStats = pokemon['stats']
    // console.log(pokemonStats)
    pokedex[num] = {"name":pokemonName,'img':pokemonImg,'types':pokemonTypes,'desc':pokemonDsc,'stats':pokemonStats}

}

function updatePokemon(){
    document.getElementById('pokemonImg').src = pokedex[this.id]['img']
    let typesDiv = document.getElementById('pokemon-type')
    while(typesDiv.firstChild){
    typesDiv.firstChild.remove()
    }
    // let stats = pokedex[this.id]['stats']
    // for(let i = 0;i < stats.length;i++){
    //     let stat = document.createElement('div')
    //     stat.innerText = stats[i]['stat']['name'] +':'
    //     stat.innerText += stats[i]['base_stat']
    //     console.log(stats[i])
    //     stat.classList.add('statsBox')
    //     typesDiv.appendChild(stat)
    // }
    let types = pokedex[this.id]['types']
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
    // Declare variables
    input = document.getElementById('myInput');
    filter = input.value.toUpperCase();
    li = document.getElementsByClassName('pokemonCard');
    // console.log(li[0].innerText)
    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
      txtValue = li[i].innerText;
      if (txtValue.toUpperCase().indexOf(filter)  > -1) {
        li[i].style.display = "";
      } else {
        li[i].style.display = "none";
      }
    
  }
}
