module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545, // Default port for Ganache GUI; for CLI, use 8545
      network_id: "*", // Match any network id
    },
  },
  compilers: {
    solc: {
      version: "0.8.0", // Use the same Solidity version as in your contracts
    },
  },
};
