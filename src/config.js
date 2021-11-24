export const ADDRESS = '0xa46bA71B9e1A38bE6221F6B096850cc6a037d549';
export const ABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "_pokedex_id",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "_species_count",
        "type": "uint256"
      }
    ],
    "name": "PokemonCaught",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "_pokedex_id",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "_count",
        "type": "uint256"
      }
    ],
    "name": "SpeciesAdded",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "pokemon_counts",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "pokemons",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "species_id",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "pokedex_id",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "own",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "hp",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "att",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "def",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "spatt",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "spdef",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "speed",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "lv",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "species",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "pokedex_id",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "count",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "caught",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "unique_species_count",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_pokedex_id",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_count",
        "type": "uint256"
      }
    ],
    "name": "addSpecies",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_pokedex_id",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_hp",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_att",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_def",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_spatt",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_spdef",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_speed",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_lv",
        "type": "uint256"
      }
    ],
    "name": "caughtPokemon",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];
