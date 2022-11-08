const form = document.getElementById('form');
const inputPoke = document.querySelector('.pokeInput');
const cajaPoke = document.querySelector('.contenedorPokedex');
const loader = document.getElementById('load');

const fetchPokes = async (input) => {
    try {
        const urlBase = 'https://pokeapi.co/api/v2/pokemon/';
        const query = input;
        const response = await fetch(urlBase + query);
        const data = await response.json();
        return data;
    }catch (error){
        console.log('error');
    }
};

const renderPokemon = (pokemon) => {
    const { id, name, sprites, weight, height, types } = pokemon;
    cajaPoke.innerHTML =  
        `
        <div id="pokeResultado">
            <h1>El número de pokemon: ${id}</h1>
            <p>Nombre pokemon: ${name.charAt(0).toUpperCase() + name.slice(1)}</p>
            <p>Tipo: ${types.map( tipo => { return `<span>${tipo.type.name}</span>` } ).join(' ')}</p>
            <p>Peso: ${weight / 10}</p>
            <p>Peso: ${height / 10}</p>
            <img class="imgPoke" src="${sprites.other.home.front_default}" alt="poke">
        </div>
        `
};

const renderError = (id) => {
    cajaPoke.innerHTML =
        `
        <div>
            <h1>El numero de pokemon: ${id} no existe</h1>
            <img class="sadPika" src="./assets/img/sad_pikachu.gif">
        </div>
        `
};

const renderIdVacio = () => {
    cajaPoke.innerHTML =
        `
        <div>
            <h1>Ingrese un número</h1>
        </div>
        `
};

const searchPoke = async (e) => {
    e.preventDefault();
    const pokeIdIngresado = inputPoke.value.replace(/^0+/, '');
    if(pokeIdIngresado === '')return renderIdVacio() // alert('No puede estar vacio');
    // traigo el elemento de la api
    const fetchedPokes = await fetchPokes(pokeIdIngresado);
    // valido que el elemento no sea undefined, ni este en la lista
    if(!fetchedPokes) {
        form.reset();
        return renderError(pokeIdIngresado); //alert("No existe")
    } else if (pokeIdIngresado === fetchedPokes.id) {
        form.reset();
        return alert("Ya estamos mostrando el pokemon")
    }
    // si paso la validacion, lo agrego a mi lista de pokemones
    loader.classList.remove('hidden')
    setTimeout(() => {
        renderPokemon(fetchedPokes);
        loader.classList.add('hidden');
        form.reset();
    },3000)
}

const init = async () => {
    form.addEventListener("submit", searchPoke)
}

init();