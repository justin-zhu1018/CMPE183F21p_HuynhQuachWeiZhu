var Election = artifacts.require("./World.sol");

contract("World", function (accounts) {
  it("No captured population initially", function () {
    return Election.deployed().then(async function (instance) {
      let population = await instance.pokemon_counts()
      population = population.words[0]
      assert.equal(population, 0, "Correct captured population");
    });
  });

  it("Capture Pokemon", function () {
    return Election.deployed().then(async function (instance) {
      let caught_count = await instance.species(1)
      caught_count = caught_count.caught.words[0]
      //catch pokemon
      await instance.caughtPokemon(1)
      let population = await instance.pokemon_counts()
      population = population.words[0]
      assert.equal(population, 1, "Correct captured population");
      let pokemon = await instance.pokemons(1)
      assert.equal(pokemon.id.words[0], 1, "Correct id");
      assert.equal(pokemon.pokedex_id.words[0], 1, "Correct pokedex id");
      assert.equal(pokemon.species_id.words[0], 1, "Correct species id");
      assert.notEqual(pokemon.own, null, "Owned by someone");
      //recording caught pokemon into species chain
      let new_caught_count = await instance.species(1)
      assert.equal(new_caught_count.caught.words[0], caught_count + 1, "Correct species id");
    });
  });

  it("Capture Extincted Pokemon", function () {
    return Election.deployed().then(async function (instance) {
      for (let i=0; i<5; i++){
        await instance.caughtPokemon(1)
      }
      let caught_count = await instance.species(1)
      assert.equal(caught_count.caught.words[0], caught_count.count.words[0], "Correct maxed Species");
      caught_count = caught_count.caught.words[0]

      let population = await instance.pokemon_counts()
      population = population.words[0]
      assert.equal(population, caught_count, "Unable to catch maxed pokemon");
    });
  });

  it("Capture doesn't exist Pokemon", function () {
    return Election.deployed().then(async function (instance) {
      let population = await instance.pokemon_counts()
      population = population.words[0]
      await instance.caughtPokemon(9999)
      let new_population = await instance.pokemon_counts()
      assert.equal(population, new_population.words[0], "Correct captured population");
    });
  });
})