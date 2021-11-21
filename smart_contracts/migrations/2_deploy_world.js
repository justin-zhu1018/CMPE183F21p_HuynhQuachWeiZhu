const world = artifacts.require("World");

module.exports = function (deployer) {
  deployer.deploy(world);
};
