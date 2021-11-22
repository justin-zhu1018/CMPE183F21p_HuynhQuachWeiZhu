var Election = artifacts.require("./World.sol");

contract("World", function (accounts) {
  var WorldInstance;

  it("initializes with 4 species", function () {
    return Election.deployed().then(function (instance) {
      return instance.unique_species_count();
    }).then(function (count) {
      assert.equal(count, 4);
    });
  });

  it("it initializes the each species with the correct values", function () {

    let init_species_counts = 2

    return Election.deployed().then(function (instance) {
      WorldInstance = instance;
      return WorldInstance.species(1);
    }).then(function (species) {
      assert.equal(species.id, 1, "contains the correct id");
      assert.equal(species.pokedex_id, 1, "contains the correct species id");
      assert.equal(species.count, init_species_counts, "contains the correct population counts");
      assert.equal(species.caught, 0, "contains the correct capture");

      return WorldInstance.species(2).then((species) => {
        assert.equal(species.id, 2, "contains the correct id");
        assert.equal(species.pokedex_id, 4, "contains the correct species id");
        assert.equal(species.count, init_species_counts, "contains the correct population counts");
        assert.equal(species.caught, 0, "contains the correct capture");

        return WorldInstance.species(3).then((species) => {
          assert.equal(species.id, 3, "contains the correct id");
          assert.equal(species.pokedex_id, 7, "contains the correct species id");
          assert.equal(species.count, init_species_counts, "contains the correct population counts");
          assert.equal(species.caught, 0, "contains the correct capture");

          return WorldInstance.species(4).then((species) => {
            assert.equal(species.id, 4, "contains the correct id");
            assert.equal(species.pokedex_id, 10, "contains the correct species id");
            assert.equal(species.count, init_species_counts, "contains the correct population counts");
            assert.equal(species.caught, 0, "contains the correct capture");
          })
        })
      })
    })
  });

  it("Increment species population", function () {
    return Election.deployed().then(async function (instance) {
      let species = await instance.species(1)
      let population = species.count.words[0]
      await instance.addSpecies(1, 2)
      species = await instance.species(1)
      assert.equal(species.count.words[0], population + 2, "correctly increment");
    });
  });

  it("Add new species population", function () {
    return Election.deployed().then(async function (instance) {
      let population = await instance.unique_species_count()
      population = population.words[0]

      await instance.addSpecies(76, 2)
      let new_population = await instance.unique_species_count()
      assert.equal(new_population.words[0], population + 1, "contains the correct id");

      return instance.species(population + 1).then(species => {
        assert.equal(species.id, population + 1, "contains the correct id");
        assert.equal(species.pokedex_id, 76, "contains the correct species id");
        assert.equal(species.count, 2, "contains the correct population counts");
        assert.equal(species.caught, 0, "contains the correct capture");
      })
    });
  });
})