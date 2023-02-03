require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  defaultNetwork: "mumbai",
  networks: {
    mumbai: {
      url: "https://polygon-testnet.public.blastapi.io",
      chainId: 80001,
      accounts: [
        // "edf38e734f43872ad5d9c6a42eab6c265200aa3486241be824601a7fc94575ba",
        "edf38e734f43872ad5d9c6a42eab6c265200aa3486241be824601a7fc94575ba",
      ],
    },
    goerli: {
      url: "https://goerli.blockpi.network/v1/rpc/public",
      chainId: 5,
      accounts: [
        "edf38e734f43872ad5d9c6a42eab6c265200aa3486241be824601a7fc94575ba",
      ],
    },
  },
};
