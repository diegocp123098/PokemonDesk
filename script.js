const Input = document.getElementById("input-user");
const imgPokemon = document.getElementById("img-pokemon");
const namePokemon = document.getElementById("name-pokemon");
const grid = document.getElementById("grid");

let pokemonList = [];

Input.addEventListener("keydown", function(event){
    if(event.key == "Enter"){
        getPokemon();
    }
})

async function getPokemon(){
    const pokemonName = Input.value;
    let exists = checkPokemon(Input.value)

    if(exists == true){
        return;
    }

    try{
        const response = await fetch(
            "https://pokeapi.co/api/v2/pokemon/" + pokemonName,
        );

        const data = await response.json();
        
        savePokemon(data);
        show();
    }catch (error){
        console.log(error);
    }
    
}

function checkPokemon(pokemonName){
    for ( let pokemon of pokemonList){
        if(pokemonName == pokemon.id || pokemonName == pokemon.name){
            return true;
        }
    }

    return false;
}

function savePokemon (data){
    let newPokemon = {
        id: data.id,
        name: data.name,
        img_front: data.sprites.front_default,
        img_back: data.sprites.back_default
    }

    pokemonList.push(newPokemon);
    console.log(pokemonList);
}

function show(){
    for (pokemon of pokemonList){
        createCard(pokemon);
    }
}

function createCard(pokemon){
    //cria div, texto e imagem
    const newDiv = document.createElement("div");
    const newText = document.createElement("p");
    const newImg = document.createElement("img");

    //define o valor do texto e do src da imagem
    newText.textContent = pokemon.name;
    newImg.src = pokemon.img_front;

    //inseri dentro do site
    newDiv.appendChild(newImg);
    newDiv.appendChild(newText);

    newDiv.classList.add("card-pokemon");
    grid.appendChild(newDiv);
}