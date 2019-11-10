var DNSNaming = artifacts.require("DNSNaming");

module.exports = function(deployer) {
  deployer.deploy(DNSNaming);
};