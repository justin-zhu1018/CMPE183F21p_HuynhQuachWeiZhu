import React, { useState, useEffect } from "react"
import Web3 from "web3"
import { getPokeobj, getStats } from "../pokemon_functions/pokemon"
import { getTypes } from "../pokemon_functions/pokemon"
import { Box, Text, Image, Button, Badge, HStack } from "@chakra-ui/react"
import "./main.css"
import PokemonImage from "../../images/pokemon.png"
import ExploreModal from "./ExploreModal"
import World from "../../abis/World.json"

// Enable this if you want to manually import JSON
// import { ABI, ADDRESS } from "../../config"

export default function Main() {
  const [status, setStatus] = useState("OK")
  const [network, setNetwork] = useState()
  const [account, setAccount] = useState()
  const [gameWorld, setGameWorld] = useState()
  const [species, setSpecies] = useState([])
  const [usersPokemon, setUsersPokemon] = useState()
  const [explorePokemon, setExplorePokemon] = useState()
  const [address, setAddress] = useState()

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
    const web3 = new Web3(Web3.givenProvider || "http://localhost:7545")
    const network = await web3.eth.net.getNetworkType()
    const accounts = await web3.eth.getAccounts()

    // Enable this if need to manually read ABI and ADDRESS
    // const gameInst = new web3.eth.Contract(ABI, ADDRESS)

    // Read JSON from src
    const networkId = await web3.eth.net.getId()
    const networkData = World.networks[networkId]
    const abi = World.abi
    const address = networkData.address
    setAddress(address)
    const gameInst = new web3.eth.Contract(abi, address)

    setNetwork(network || null)
    setAccount(accounts[0] || null)
    setGameWorld(gameInst || null)

    console.log("network:", network)
    console.log("accounts:", accounts)
    console.log("game instance:", gameInst)
    return { gameInst, account: accounts[0] }
  }

  async function loadWorld(gameWorld) {
    const species_counts = await gameWorld.methods
      .unique_species_count()
      .call()
      .catch(() => {
        setStatus("Did you replace your address and ABI yet?")
      })
    setStatus("OK")
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
        poke_type: await getTypes(species.pokedex_id),
        poke_stats: await getStats(species.pokedex_id),
        poke_level: 100,
      })
    }
    setSpecies(temp_arr)
    console.log("Load world:", temp_arr)
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
          poke_type: await getTypes(pokemon.pokedex_id),
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
    console.log("user pokemon Data: ", temp_arr)
  }

  const catch_random_pokemon = async () => {
    if (status === "Did you replace your address and ABI yet?") {
      return
    }
    if (network && account) {
      try {
        let random_pokemon = explorePokemon
        if (random_pokemon) {
          //catch
          //pokedex,hp,att,def,spatt,spdef,sp,lv
          await gameWorld.methods
            .caughtPokemon(
              random_pokemon.id,
              random_pokemon.pokedex_id,
              random_pokemon.poke_stats[0].base_stat,
              random_pokemon.poke_stats[1].base_stat,
              random_pokemon.poke_stats[2].base_stat,
              random_pokemon.poke_stats[3].base_stat,
              random_pokemon.poke_stats[4].base_stat,
              random_pokemon.poke_stats[5].base_stat,
              100
            )
            .send({ from: account })
            .then(() => {
              window.location.reload()
            })
        }
        setStatus("OK")
      } catch (error) {
        console.log(error)
        setStatus("User denied transaction signature!")
      }
    } else {
      setStatus("Please make sure your MetaMask account is connected!")
    }
  }

  async function add_selected_pokemon(id) {
    if (status === "Did you replace your address and ABI yet?") {
      return
    }
    if (network && account) {
      console.log("start")
      const web3 = new Web3(Web3.givenProvider || "http://localhost:7545")
      try {
        await gameWorld.methods
          .addSpecies(id, 1)
          .send({ from: account })
          .then(() => {
            window.location.reload()
          })

        const gameInst = new web3.eth.Contract(World.abi, address)
        setGameWorld(gameInst || gameWorld)
        setStatus("OK")
      } catch (error) {
        setStatus("User denied transaction signature!")
      }
    } else {
      setStatus("Please make sure your MetaMask account is connected!")
    }
  }

  function explore_random_pokemon() {
    let random_pokemon = 0
    for (let i = 0; i < 10000; i++) {
      random_pokemon = getRandomInt(species.length)
      if (species[random_pokemon].caught < species[random_pokemon].count) {
        random_pokemon = species[random_pokemon]
        setExplorePokemon(random_pokemon)
        localStorage.setItem("explorePokemon", JSON.stringify(random_pokemon))
        return random_pokemon
      }
    }
    return null
  }

  function getRandomInt(max) {
    return Math.floor(Math.random() * max)
  }

  const connectToMetaMask = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" })
        window.location.reload()
      } catch (error) {
        if (error.code === 4001) {
          console.log(error)
          setStatus("User rejected MetaMask request!")
        }
      }
    }
  }
  return (
    <HStack spacing="24px">
      <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
        <Box marginLeft="15px" marginBottom="5px">
          <Text color="white"> Status: {status}</Text>
          <Text color="white">Network: {network}</Text>
          <Text color="white">Account: {account}</Text>
          <Button onClick={connectToMetaMask}>Connect</Button>{" "}
        </Box>
      </nav>
      <Box className="container-filled">
        <Box className="row">
          <Box role="main" className="d-flex justify-content-center">
            <Box className="content mr-auto ml-auto" style={{ opacity: "0.8" }}>
              <Box className="pokemon">
                <img src={PokemonImage} />
              </Box>
              <Text fontSize="50px" fontWeight="semibold" color="black">
                Explore and catch pokemon!
              </Text>
              <Box marginBottom="10px">
                <Button
                  background="#00A3C4"
                  size="20px"
                  onClick={() => {
                    explore_random_pokemon()
                  }}
                >
                  {localStorage.getItem("explorePokemon")&&<ExploreModal
                    catch_random_pokemon={() => catch_random_pokemon()}
                  />}
                </Button>
              </Box>
            </Box>
          </Box>
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
                      <Text fontSize="36px">{creature.hp}</Text>
                      <Badge
                        borderRadius="full"
                        color="white"
                        px="2"
                        background="green"
                      >
                        {creature.poke_type}
                      </Badge>
                      <Box>
                        <Badge ml="1" fontSize="0.8em" colorScheme="purple">
                          {creature.count - creature.caught} left
                        </Badge>
                      </Box>
                      <Button
                        colorScheme="teal"
                        variant="solid"
                        size="md"
                        onClick={() => add_selected_pokemon(creature.id)}
                      >
                        Add
                      </Button>
                    </Box>
                  </Box>
                </Box>
              )
            })}
          </Box>
        </Box>

        <Box className="userpokemon_container">
          <Box>
            {" "}
            <Text fontSize="40px" fontWeight="semibold" color="black">
              Your Pokemons:
            </Text>
          </Box>

          <Box className="d-flex flex-row mb=4">
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
                        <Badge
                          color="white"
                          borderRadius="full"
                          px="2"
                          background="green"
                        >
                          {creature.poke_type}
                        </Badge>
                        <Text>Level: {creature.lv}</Text>
                        <Text>HP: {creature.hp}</Text>

                        <Text>Attack: {creature.att}</Text>
                        <Text>Defense: {creature.def}</Text>
                        <Text>Sp. Att: {creature.spatt}</Text>
                        <Text>Sp. Def: {creature.spdef}</Text>
                        <Text>Speed: {creature.speed}</Text>
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
