const Pokedex = require('pokedex-promise-v2');
const P = new Pokedex();
const pokemon = require('./pokemon')
const {TYPES, TYPE_CHART, TYPE_ORDER} = require('./typeChart')

const stats_weight = {
    stats: 0.4,
    type: 0.1,
    lv: 0.3,
    rarity: 0.2
}

function type_modifier(type1_pokemon, type2_enemy){
    return TYPE_CHART[type1_pokemon.toLowerCase()][TYPE_ORDER[type2_enemy.toLowerCase()]]
}

function compute_types(types1, types2){
    let total = 0;
    for (let type1 of types1){
        for (let type2 of types2){
            total = total + type_modifier(type1, type2)
        }
    }
    return total
}

function compute_Stats(stats){
    let total = 0
    for (stat of stats){
        total = total + (stat.base_stat)
    }
    return total
}

async function fight_rate(pokemon1, pokemon2, p1_lv=1, p2_lv=1){

    /**
     * pokemon = {
     * level = int
     * stats = []
     * totalStats = int
     * types = []
     * }
     */

    console.log(pokemon1, p1_lv, pokemon2, p2_lv)

    pokemon1 = {name:pokemon1.toLowerCase()}
    pokemon2 = {name:pokemon2.toLowerCase()}
    pokemon1['level'] = p1_lv
    pokemon2['level'] = p2_lv

    await pokemon.getStats(pokemon1.name).then(res=>{
        pokemon1['stats']=res
    })
    await pokemon.getTypes(pokemon1.name).then(res=>{
        pokemon1['types']=res
    })
    await P.getPokemonSpeciesByName(pokemon1.name).then(res=>{
        let rarity = 1
        if (res.is_baby) rarity = 0
        else if (res.is_mythical) rarity = 3
        else if (res.is_legendary) rarity = 3
        pokemon1['rarity']=rarity
    })

    await pokemon.getStats(pokemon2.name).then(res=>{
        pokemon2['stats']=res
    })
    await pokemon.getTypes(pokemon2.name).then(res=>{
        pokemon2['types']=res
    })
    await P.getPokemonSpeciesByName(pokemon2.name).then(res=>{
        let rarity = 1
        if (res.is_baby) rarity = 0
        else if (res.is_mythical) rarity = 3
        else if (res.is_legendary) rarity = 3
        pokemon2['rarity']=rarity
    })

    pokemon1['totalStats'] = compute_Stats(pokemon1.stats)
    pokemon2['totalStats'] = compute_Stats(pokemon2.stats)

    /**
     * Computing
     */
    console.log((pokemon1.totalStats/720)*stats_weight.stats 
    , (compute_types(pokemon1.types, pokemon2.types)/8)*stats_weight.type 
    , (pokemon1.level/100)*stats_weight.lv , (pokemon1.rarity/5)*stats_weight.rarity)
    pokemon1['weighted_win_rate'] = (pokemon1.totalStats/720)*stats_weight.stats 
    + (compute_types(pokemon1.types, pokemon2.types)/8)*stats_weight.type 
    + (pokemon1.level/100)*stats_weight.lv + (pokemon1.rarity/5)*stats_weight.rarity

    pokemon2['weighted_win_rate'] = (pokemon2.totalStats/720)*stats_weight.stats 
    + (compute_types(pokemon2.types, pokemon1.types)/8)*stats_weight.type 
    + (pokemon2.level/100)*stats_weight.lv + (pokemon2.rarity/5)*stats_weight.rarity

    //stats
    console.log(pokemon1,pokemon2)

    //winrate stats
    //Round to 0 decimal
    let percentage = parseInt( Math.abs((((pokemon1.weighted_win_rate-pokemon2.weighted_win_rate)
    /(pokemon1.weighted_win_rate<pokemon2.weighted_win_rate?pokemon1.weighted_win_rate:pokemon2.weighted_win_rate))*100).toFixed(0))   )

    let p1winrate = 50
    let p2winrate = 50
    if (pokemon1.weighted_win_rate > pokemon2.weighted_win_rate && percentage <= 49){
        p1winrate += percentage
        p2winrate -= percentage
    }
    else if(pokemon1.weighted_win_rate < pokemon2.weighted_win_rate && percentage <= 49){
        p2winrate += percentage
        p1winrate -= percentage
    }
    else if(pokemon1.weighted_win_rate < pokemon2.weighted_win_rate){
        p2winrate  = 99
        p1winrate = 1
    }
    else if(pokemon1.weighted_win_rate > pokemon2.weighted_win_rate){
        p2winrate  = 1
        p1winrate = 99
    }

    pokemon1['win_rate'] = p1winrate
    pokemon2['win_rate'] = p2winrate

    return [pokemon1, pokemon2]
}

module.exports = { fight_rate };
