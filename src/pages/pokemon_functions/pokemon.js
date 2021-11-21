const Pokedex = require('pokedex-promise-v2');
const P = new Pokedex();

/**
 * get pokemon gif or png of a pokemon
 * @param {*} pokemonName
 * @returns 
 */
async function getPokeobj(pokemonName) {
    let img = null
    let id = null
    let name = null
    await P.getPokemonByName(pokemonName.toLowerCase()) // with Promise
        .then(function (response) {
            img = response.sprites.versions['generation-v']['black-white'].animated.front_default || response.sprites.front_default
            id = response.id
            name = response.name
        })
        .catch(function (error) {
            throw error
        });
    return {img, id, name}
}

/**
 * get stats of a pokemon
 * @param {*} pokemonName 
 * @returns 
 */
async function getStats(pokemonName) {
    let stats = null
    await P.getPokemonByName(pokemonName.toLowerCase()) // with Promise
        .then(function (response) {
            stats = response.stats
        })
        .catch(function (error) {
            throw error
        });
    return stats
}

/**
 * get types of a pokemon
 * @param {*} pokemonName 
 * @returns 
 */
 async function getTypes(pokemonName) {
    let types = []
    await P.getPokemonByName(pokemonName.toLowerCase()) // with Promise
        .then(function (response) {
            let type_list = response.types
            for (let slot of type_list){
                types.push(slot.type.name)
            }
        })
        .catch(function (error) {
            throw error
        });
    return types
}

module.exports = { getPokeobj, getStats, getTypes };