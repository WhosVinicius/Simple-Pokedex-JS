const pokemonCount = 905;
var pokedex = {};
var direito = document.getElementsByClassName("rightSide")[0];
var esquerdo = document.getElementsByClassName("leftSide")[0];
var main = document.getElementsByClassName("grid")[0];
var relacionados = document.getElementById("relacionados");
var atual = null;
var testq = [
  "normal",
  "ground",
  "fire",
  "water",
  "ice",
  "dark",
  "steel",
  "poison",
  "psychic",
  "ghost",
  "electric",
  "fairy",
  "rock",
  "grass",
  "bug",
  "fighting",
  "dragon",
];

window.onload = async function () {
  for (let i = 1; i < pokemonCount; i++) {
    await getPokemon(i);
    let card = genRel(i);
    card.classList.add("card");
    direito.appendChild(card);
  }
};

// function genCards(i){
//   let pokemon = document.createElement('div')
//   pokemon.id = i
//   pokemon.innerText = pokedex[i]['name'].toUpperCase()
//   pokemon.classList.add('pokemonCard')
//   let types = pokedex[i]['types']
//   pokemon.classList.add(types[0]['type']['name'].toLowerCase())
//   pokemon.addEventListener('click',updatePokemon)
//   pokemon.addEventListener('click',relaciona)
//   return pokemon
// }

function genRel(i) {
  let pokemon = document.createElement("div");
  let img = document.createElement("img");
  pokemon.id = i;
  pokemon.innerText += pokedex[i]["name"].toUpperCase();
  pokemon.appendChild(img);
  img.src = pokedex[i]["img"];
  pokemon.classList.add("with-img");
  let types = pokedex[i]["types"];
  pokemon.classList.add(types[0]["type"]["name"].toLowerCase());
  pokemon.addEventListener("click", updatePokemon);
  pokemon.addEventListener("click", relaciona);
  return pokemon;
}

//declaração de variaveis
async function getPokemon(num) {
  let url = "https://pokeapi.co/api/v2/pokemon/" + num.toString();
  let res = await fetch(url);
  let pokemon = await res.json();
  console.log(pokemon);
  let pokemonName = pokemon["name"];
  let pokemonTypes = pokemon["types"];
  let pokemonImg = pokemon["sprites"]["front_default"];
  if (pokemonImg == null) {
    pokemonImg = "";
  }
  let pokemonBack = pokemon["sprites"]["back_default"];

  //criação do dicionario pokedex
  res = await fetch(pokemon["species"]["url"]);
  let pokemonDsc = await res.json();
  pokemonDsc =
    pokemonDsc["flavor_text_entries"][Math.floor(Math.random() * 11)][
    "flavor_text"
    ];
  let pokemonStats = pokemon["stats"];
  pokedex[num] = {
    name: pokemonName,
    img: pokemonImg,
    back: pokemonBack,
    types: pokemonTypes,
    desc: pokemonDsc,
    stats: pokemonStats,
  };
}

function updatePokemon() {
  atual = pokedex[this.id]["name"];
  let img = document.getElementById("pokemonImg");
  img.src = pokedex[this.id]["img"];
  main.classList.remove(
    "normal",
    "ground",
    "fire",
    "water",
    "ice",
    "dark",
    "steel",
    "poison",
    "psychic",
    "ghost",
    "electric",
    "fairy",
    "rock",
    "grass",
    "bug",
    "fighting",
    "dragon"
  );
  let statsDiv = document.getElementById("pokemonStats");
  let typesDiv = document.getElementById("pokemon-type");
  // remove os tipos do pokemon anterior
  while (typesDiv.firstChild) {
    typesDiv.firstChild.remove();
  }
  // remove os status do pokemon anterior
  while (statsDiv.firstChild) {
    statsDiv.firstChild.remove();
  }
  let stats = pokedex[this.id]["stats"];
  //gera os elementos de status
  for (let i = 0; i < stats.length; i++) {
    let stat = document.createElement("div");
    stat.innerText = stats[i]["stat"]["name"].toUpperCase() + ":";
    stat.innerText += stats[i]["base_stat"];
    stat.classList.add("statsBox");
    statsDiv.appendChild(stat);
  }
  //gera os elementos de tipo
  let types = pokedex[this.id]["types"];
  main.classList.add(types[0]["type"]["name"].toLowerCase());
  for (let i = 0; i < types.length; i++) {
    let type = document.createElement("span");
    type.innerText = types[i]["type"]["name"].toUpperCase();
    type.classList.add("typeBox");
    typesDiv.appendChild(type);
  }
  //Faz a imagem do pokemon girar ao passar o mouse

  img.addEventListener("mouseenter", () => {
    img.src = pokedex[this.id]["back"];
  });
  img.addEventListener("mouseleave", () => {
    img.src = pokedex[this.id]["img"];
  });

  //adiciona o texto de descriçao e nome aos elementos html

  document.getElementById("pokemonDescript").innerText =
    pokedex[this.id]["desc"];
  document.getElementById("pokemon-name").innerText =
    pokedex[this.id]["name"].toUpperCase();
}

function pesquisa() {
  let input = document.getElementById("myInput");
  let filter = input.value.toUpperCase();
  let card = document.getElementsByClassName("with-img");
  if (testq.includes(filter.toLowerCase())) {
    for (i = 0; i < card.length; i++) {
      let value = card[i].classList[1];
      if (value == filter.toLowerCase()) {
        card[i].style.display = "";
      } else {
        card[i].style.display = "none";
      }
    }
  } else {
    for (i = 0; i < card.length; i++) {
      let txtValue = card[i].innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        card[i].style.display = "";
      } else {
        card[i].style.display = "none";
      }
    }
  }
}

function relaciona() {
  while (relacionados.firstChild) {
    relacionados.firstChild.remove();
  }
  let mainClassList = main.classList;
  if (mainClassList.length <= 1) {
    return;
  }
  let cls = mainClassList[1];
  for (let i = 1; i < pokemonCount; i++) {
    if (atual == pokedex[i]["name"]) {
      continue;
    }
    if (pokedex[i]["types"][0]["type"]["name"] == cls) {
      let x = genRel(i);
      relacionados.appendChild(x);
    }
  }
}
