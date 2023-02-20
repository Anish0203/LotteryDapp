require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */

const ALCHEMY_API_KEY = "np9hR042AgabPUYZGIo_wNuOO74YWqy5";

// Replace this private key with your Goerli account private key
// To export your private key from Metamask, open Metamask and
// go to Account Details > Export Private Key
// Beware: NEVER put real Ether into testing accounts
const GOERLI_PRIVATE_KEY = "bf88ef37b6e8accf44964aef51dfd0e9051033620dfd8a269c6a022d5dc66ec3";

module.exports = {
  solidity: "0.8.9",
  // networks:{
  //   hardhat:{
  //     chainId: 31337,
  //   },
  // },
  paths: {
    artifacts: "./client/src/artifacts",
  },
  networks: {
    goerli: {
      url: `https://eth-goerli.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: [GOERLI_PRIVATE_KEY],
      gas: 2100000,
      gasPrice: 8000000000,
    }
  }
};