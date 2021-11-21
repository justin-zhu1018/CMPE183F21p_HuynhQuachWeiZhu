var Election = artifacts.require("./World.sol");

contract("World", function(accounts) {
  var electionInstance;

  it("initializes with two candidates", function() {
    return Election.deployed().then(function(instance) {
      return instance.unique_species_count();
    }).then(function(count) {
      assert.equal(count, 4);
    });
  });

  it("it initializes the candidates with the correct values", function() {
    return Election.deployed().then(function(instance) {
      electionInstance = instance;
      return electionInstance.species(1);
    }).then(function(candidate) {
        console.log(candidate)
    //   assert.equal(candidate[0], 1, "contains the correct id");
    //   assert.equal(candidate[1], "Candidate 1", "contains the correct name");
    //   assert.equal(candidate[2], 0, "contains the correct votes count");
    //   return electionInstance.candidates(2);
    })
  });
})