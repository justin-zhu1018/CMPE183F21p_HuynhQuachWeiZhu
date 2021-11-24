import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import { ABI, ADDRESS } from '../../config';
import { getPokeobj } from '../pokemon_functions/pokemon'
import { Card, CardBody, CardTitle, CardSubtitle, CardText, Button } from 'reactstrap'

import { ChakraProvider, Table, Thead, Tbody, Tr, Th, Td, Tfoot, TableCaption, Center, Spacer } from '@chakra-ui/react'
import './world-control.css'

export default function WorldControl() {
const [status, setStatus] = useState('OK')
const [network, setNetwork] = useState()
const [account, setAccount] = useState()
const [gameWorld, setGameWorld] = useState()
const [species, setSpecies] = useState([])
const [usersPokemon, setUsersPokemon] = useState()

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
const web3 = new Web3(Web3.givenProvider || "http://localhost:7545"); // for MetaMask
const network = await web3.eth.net.getNetworkType(); // Network you're connected to
const accounts = await web3.eth.getAccounts(); // Array of accounts
const gameInst = new web3.eth.Contract(ABI, ADDRESS);

setNetwork(network || null);
setAccount(accounts[0] || null);
setGameWorld(gameInst || null);

console.log("network:", network);
console.log("accounts:", accounts);
console.log('game instance:', gameInst);
return { gameInst, account: accounts[0] }
}

async function loadWorld(gameWorld) {
const species_counts = await gameWorld.methods.unique_species_count().call()
setSpecies_counts(species_counts)

let temp_arr = []
for (let i = 1; i <= species_counts; i++) {
    const species = await gameWorld.methods.species(i).call();
    temp_arr.push({
        pokedex_id: species.pokedex_id,
        caught: species.caught,
        count: species.count,
        id: species.id,
        poke_info: await getPokeobj(species.pokedex_id)
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
    const pokemon = await gameWorld.methods.pokemons(i).call();
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
        break;
    }
    random_pokemon = null
}

if (random_pokemon) {
    //catch
    //pokedex,hp,att,def,spatt,spdef,sp,lv
    await gameWorld.methods.caughtPokemon(random_pokemon.pokedex_id,100,100,100,100,100,100,100).send({ from: account }).then(()=>{
        window.location.reload();
    })
}
}

function getRandomInt(max) {
return Math.floor(Math.random() * max);
}

async function add_selected_pokemon() {
    if(status === "Did you replace your address and ABI yet?"){
        return;
    }
    if(network && account) {
        console.log("start");
        const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
        try {
            await gameWorld.methods.addSpecies(1, 2).send({ from: account }).then(()=>{
                window.location.reload()});
            
            const gameInst = new web3.eth.Contract(ABI, ADDRESS);

			setGameWorld(gameInst || gameWorld);

            setStatus('OK')	
            console.log("success");
        } catch (error) {
            console.log(error);
            setStatus('User denied transaction signature!');
        }
    } else {
        setStatus('Please make sure your MetaMask account is connected!')
    }
}

// className="poke-card"
return (
<ChakraProvider>
    <div>
        <p>Network: {network}</p>
        <p>Account: {account}</p>
        <Card className="poke-card">
            <Table size="sm" variant="simple">
                <TableCaption placement="top">Pokemon World Controller</TableCaption>
                <Thead>
                    <Tr>
                        <Th>Pokemon</Th>
                        <Th>Number In World</Th>
                        <Th>Select</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {species.map((creature, ind) => {
                        return (
                            <Tr key={ind}>
                                <Td><img src={creature.poke_info.img} height="50" width="50" 
                                />{" "}</Td>
                                <Td><nobr>{creature.count - creature.caught} left</nobr>{" "}</Td>
                                <Td>                                            
                                    <Button 
                                        style={{
                                        padding: "5px",
                                        margin: "1px"}}
                                        onClick={add_selected_pokemon}
                                    >
                                    Select
                                    </Button>
                                </Td>
                            </Tr>
                        )                               
                    })}
                </Tbody>
                <Tfoot>
                    <Tr>
                        <Th></Th>
                        <Th>
                            <Center>
                                <Button 
                                    style={{
                                    padding: "5px",
                                    margin: "1px"}} 
                                >
                                Add 1
                                </Button>
                                <Button 
                                    style={{
                                    padding: "5px",
                                    margin: "1px"}}
                                >
                                Add 10
                                </Button>
                                <Button 
                                    style={{
                                    padding: "5px",
                                    margin: "1px"}}
                                >
                                Add 100
                                </Button>
                            </Center>
                        </Th>
                        <Th></Th>
                    </Tr>
                </Tfoot>
            </Table>
            {/* <CardBody>
                <CardTitle tag="h5">
                    Current Pokemon In The World
                </CardTitle>
                <CardSubtitle
                    className="mb-2 text-muted"
                    tag="h6"
                >
                    Wild Pokemon
                </CardSubtitle> 
                    {species.map((creature, ind) => {
                        return (
                            <Flex direction = 'row' alignItems = 'center'>
                                <div key={ind}>
                                    <img src={creature.poke_info.img} height="50" width="50" 
                                    />{" "}
                                    <nobr>{creature.count - creature.caught} left</nobr>{" "}
                                    <Button 
                                        style={{marginTop:"20px"}} 
                                    >
                                        Select
                                    </Button>
                                    <Spacer/>  
                                </div>
                            </Flex>
                        )                               
                    })}                       
                <Button style={{marginTop:"20px"}} >Explore!</Button>
            </CardBody> */}
        </Card>

    



    </div>
</ChakraProvider>

)

}