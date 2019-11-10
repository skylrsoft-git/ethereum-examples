var BankGurantee = artifacts.require("BankGurantee");

module.exports = function(deployer) {
  deployer.deploy(BankGurantee);
};