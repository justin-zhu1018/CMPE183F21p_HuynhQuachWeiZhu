// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0; // Solidity Version definition

contract World {
    // Contract name

    struct Species {
        uint256 id;
        uint256 pokedex_id;
        uint256 count;
        uint256 caught;
    }

    struct Pokemon {
        uint256 id;
        uint256 species_id;
        uint256 pokedex_id;
        address own;
        //Add poke stats down here maybe
    }

    mapping(uint256 => Species) public species; // Key-value mapping structure for tasks (id => Task)
    mapping(uint256 => Pokemon) public pokemons; // Key-value mapping structure for tasks (id => Task)

    uint256 public unique_species_count; // Keep track of number of tasks in todoList
    uint256 public pokemon_counts; // Keep track of number of tasks in todoList

    // Run every time contract is deployed
    constructor() {
        unique_species_count = 0;
        pokemon_counts = 0;
        //init some species
        addSpecies(1, 2);
        addSpecies(4, 2);
        addSpecies(7, 2);
        addSpecies(10, 2);
    }

    // Events are useful to know when things are done (states)
    event SpeciesAdded(uint256 _pokedex_id, uint256 _count);
    event PokemonCaught(uint256 _pokedex_id, uint256 _species_count);

    function addSpecies(uint256 _pokedex_id, uint256 _count) public {
        if (species[_pokedex_id].count > 0) {
            //exist species
            species[_pokedex_id].count += _count;
        } else {
            unique_species_count++;
            species[unique_species_count] = Species(unique_species_count, _pokedex_id, _count, 0);
        }
        emit SpeciesAdded(_pokedex_id, _count); // Broadcast the event
    }

    function caughtPokemon(uint256 _pokedex_id)
        public
    {
        if (species[_pokedex_id].caught < species[_pokedex_id].count) {
            //exist species
            Species memory _species = species[_pokedex_id];
            _species.caught += 1;

            pokemon_counts += 1;
            pokemons[pokemon_counts] = Pokemon(
                pokemon_counts,
                _species.caught,
                _pokedex_id,
                msg.sender
            );
            species[_pokedex_id] = _species;
            emit SpeciesAdded(_pokedex_id, _species.caught); // Broadcast the event
        }
    }
}
