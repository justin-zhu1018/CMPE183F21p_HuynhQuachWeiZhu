import React, { useState, useEffect } from "react"
import Web3 from "web3"
import { ABI, ADDRESS } from "../../config"
import { getPokeobj } from "../pokemon_functions/pokemon"
import { getTypes } from "../pokemon_functions/pokemon"
import { Box, Text, Image, Button, Badge, HStack } from "@chakra-ui/react"
import "./main.css"
import PokemonImage from "../../images/pokemon.png"
import { useDisclosure } from "@chakra-ui/react"

export default function Main() {
  const [network, setNetwork] = useState()
  const [account, setAccount] = useState()
  const [gameWorld, setGameWorld] = useState()
  const [species, setSpecies] = useState([])
  const [usersPokemon, setUsersPokemon] = useState()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [species_counts, setSpecies_counts] = useState(0)
  const [pokemon_counts, setPokemon_counts] = useState(0)

  useEffect(async () => {
    await loadBlockchainData().then(async (resp) => {
      if (resp) {
        await loadWorld(resp.gameInst)
        await loadUsersPokemon(resp.gameInst, resp.account)
      }
    })
  }, [])

  async function loadBlockchainData() {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:7545") // for MetaMask
    const network = await web3.eth.net.getNetworkType() // Network you're connected to
    const accounts = await web3.eth.getAccounts() // Array of accounts
    const gameInst = new web3.eth.Contract(ABI, ADDRESS)

    setNetwork(network || null)
    setAccount(accounts[0] || null)
    setGameWorld(gameInst || null)

    console.log("network:", network)
    console.log("accounts:", accounts)
    console.log("game instance:", gameInst)
    return { gameInst, account: accounts[0] }
  }

  async function loadWorld(gameWorld) {
    const species_counts = await gameWorld.methods.unique_species_count().call()
    setSpecies_counts(species_counts)

    let temp_arr = []
    for (let i = 1; i <= species_counts; i++) {
      const species = await gameWorld.methods.species(i).call()
      temp_arr.push({
        pokedex_id: species.pokedex_id,
        caught: species.caught,
        count: species.count,
        id: species.id,
        poke_info: await getPokeobj(species.pokedex_id),
        poke_type: await getTypes(species.id),
      })
    }
    setSpecies(temp_arr)
    console.log(temp_arr)
  }

  async function loadUsersPokemon(gameWorld, account) {
    const pokemon_counts = await gameWorld.methods.pokemon_counts().call()
    setPokemon_counts(pokemon_counts)

    let temp_arr = []
    for (let i = 1; i <= pokemon_counts; i++) {
      const pokemon = await gameWorld.methods.pokemons(i).call()
      if (pokemon.own == account)
        temp_arr.push({
          pokedex_id: pokemon.pokedex_id,
          species_id: pokemon.species_id,
          own: pokemon.own,
          id: pokemon.id,
          poke_info: await getPokeobj(pokemon.pokedex_id),
          hp: pokemon.hp,
          att: pokemon.att,
          def: pokemon.def,
          spatt: pokemon.spatt,
          spdef: pokemon.spdef,
          speed: pokemon.speed,
          lv: pokemon.lv,
        })
    }
    setUsersPokemon(temp_arr)
    console.log(temp_arr)
  }

  async function catch_random_pokemon() {
    let random_pokemon = 0
    for (let i = 0; i < 10000; i++) {
      random_pokemon = getRandomInt(species.length)
      if (species[random_pokemon].caught < species[random_pokemon].count) {
        random_pokemon = species[random_pokemon]
        break
      }
      random_pokemon = null
    }

    if (random_pokemon) {
      //catch
      await gameWorld.methods
        .caughtPokemon(
          random_pokemon.pokedex_id,
          100,
          100,
          100,
          100,
          100,
          100,
          100
        )
        .send({ from: account })
        .then(() => {
          window.location.reload()
        })
    }
  }

  function getRandomInt(max) {
    return Math.floor(Math.random() * max)
  }

  return (
    <HStack spacing="24px">
      <Box className="container-filled">
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <Box
            className="navbar-brand col-sm-3 col-md-3 mr-0"
            style={{ color: "white" }}
          >
            <p>Account: {account}</p>
          </Box>

          <Box className="d-flex align-items-center" style={{ color: "white" }}>
            <p>Network: {network}</p>
          </Box>
        </nav>

        <Box className="row">
          <main role="main" className="d-flex justify-content-center">
            <div className="content mr-auto ml-auto" style={{ opacity: "0.8" }}>
              <div className="pokemon">
                <img src={PokemonImage} />
              </div>
              <Text fontSize="50px" fontWeight="semibold" color="black">
                Explore and catch pokemon!
              </Text>
              <Button
                background="#00A3C4"
                size="20px"
                onClick={() => {
                  catch_random_pokemon()
                }}
              >
                Explore!
              </Button>
            </div>
          </main>
        </Box>
        <hr></hr>
        <Box className="poke-card" alignItems="center">
          <Box className="d-flex flex-row ">
            {species.map((creature, ind) => {
              return (
                <Box>
                  <Box
                    background="#EDF2F7"
                    className="token img"
                    style={{ maxWidth: "22rem" }}
                  >
                    <Image
                      src={creature.poke_info.img}
                      position="top"
                      height="12rem"
                    />
                    <Box mt="2" letterSpacing="wide">
                      <Text textTransform="uppercase">
                        {creature.poke_info.name}
                      </Text>
                      <Badge borderRadius="full" px="2" background="green">
                        {creature.poke_type}
                      </Badge>
                      <Box>
                        {" "}
                        <Button background="#B794F4">
                          {creature.count - creature.caught} left
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              )
            })}
          </Box>
        </Box>

        <Box className="userpokemon_container">
          <Text fontSize="50px" fontWeight="semibold" color="black">
            Your Pokemons:
          </Text>
          <Box className="d-flex flex-row ">
            {usersPokemon &&
              usersPokemon.map((creature, ind) => {
                return (
                  <Box>
                    <Box
                      key={creature.ind}
                      className="token img"
                      style={{ maxWidth: "22rem" }}
                    >
                      <Image
                        src={creature.poke_info.img}
                        position="top"
                        height="12rem"
                      />
                      <Box mt="2" letterSpacing="wide">
                        <Text textTransform="uppercase">
                          {creature.poke_info.name}
                        </Text>
                        <Badge borderRadius="full" px="2" background="green">
                          {creature.poke_type}
                        </Badge>
                        <Box>
                          {" "}
                          <Button background="#B794F4">
                            {creature.count - creature.caught} left
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                )
              })}
          </Box>
        </Box>
      </Box>
    </HStack>
  )
}
