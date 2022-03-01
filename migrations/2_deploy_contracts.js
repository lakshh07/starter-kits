const Payment = artifacts.require("Payments");

module.exports = function (deployer) {
  deployer.deploy(Payment);
};
