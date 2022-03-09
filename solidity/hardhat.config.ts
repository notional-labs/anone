import 'dotenv/config';
import 'solidity-coverage';
import 'hardhat-deploy';
import 'hardhat-local-networks-config-plugin';
import '@nomiclabs/hardhat-ethers';
import '@nomiclabs/hardhat-web3';
import '@nomiclabs/hardhat-etherscan';
import '@nomiclabs/hardhat-truffle5';
import '@nomiclabs/hardhat-waffle';
import './hardhat/tasks';

const CHAIN_IDS = {
  hardhat: 31337,
  kovan: 42,
  goerli: 5,
  mainnet: 1,
  rinkeby: 4,
  ropsten: 3,
  dockerParity: 17,
  bsctest: 97,
};

const INFURA_KEY = process.env.INFURA_KEY || '';
const DEPLOYER_PRIVATE_KEY =
  process.env.DEPLOYER_PRIVATE_KEY || '0000000000000000000000000000000000000000000000000000000000000000';
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || '';
const OPTIMIZATION_ENABLE = (process.env.OPTIMIZATION_ENABLE || 'true') === 'true';

let optimizer = OPTIMIZATION_ENABLE
  ? {
      enabled: true,
      runs: 200,
      details: {
        yul: true,
        deduplicate: true,
        cse: true,
        constantOptimizer: true,
      },
    }
  : {};

export default {
  networks: {
    hardhat: {
      chainId: CHAIN_IDS.hardhat,
      // hardhat testing cannot check revert reason if optimization is enabled
      allowUnlimitedContractSize: true,
    },
    dockerParity: {
      gas: 10000000,
      live: false,
      chainId: CHAIN_IDS.dockerParity,
      url: 'http://localhost:8545',
    },
    mainnet: {
      chainId: CHAIN_IDS.mainnet,
      url: `https://mainnet.infura.io/v3/${INFURA_KEY}`,
      accounts: [`0x${DEPLOYER_PRIVATE_KEY}`], // Using private key instead of mnemonic for vanity deploy
      saveDeployments: true,
    },
    ropsten: {
      chainId: CHAIN_IDS.ropsten,
      url: `https://ropsten.infura.io/v3/${INFURA_KEY}`,
      accounts: [`0x${DEPLOYER_PRIVATE_KEY}`], // Using private key instead of mnemonic for vanity deploy
      saveDeployments: true,
    },
    kovan: {
      chainId: CHAIN_IDS.kovan,
      url: `https://kovan.infura.io/v3/${INFURA_KEY}`,
      accounts: [`0x${DEPLOYER_PRIVATE_KEY}`], // Using private key instead of mnemonic for vanity deploy
      saveDeployments: true,
    },
    rinkeby: {
      chainId: CHAIN_IDS.rinkeby,
      url: `https://rinkeby.infura.io/v3/${INFURA_KEY}`,
      accounts: [`0x${DEPLOYER_PRIVATE_KEY}`], // Using private key instead of mnemonic for vanity deploy
      saveDeployments: true,
    },
    goerli: {
      chainId: CHAIN_IDS.goerli,
      url: `https://goerli.infura.io/v3/${INFURA_KEY}`,
      accounts: [`0x${DEPLOYER_PRIVATE_KEY}`], // Using private key instead of mnemonic for vanity deploy
      saveDeployments: true,
    },
    bsc: {
      chainId: 56,
      url: 'https://bsc-dataseed.binance.org',
      accounts: [`0x${DEPLOYER_PRIVATE_KEY}`], // Using private key instead of mnemonic for vanity deploy
      saveDeployments: true,
    },
    bsctest: {
      chainId: 97,
      url: 'https://data-seed-prebsc-1-s2.binance.org:8545',
      accounts: [`0x${DEPLOYER_PRIVATE_KEY}`], // Using private key instead of mnemonic for vanity deploy
      saveDeployments: true,
    },
    apothem: {
      chainId: 51,
      url: 'https://rpc.apothem.network',
      accounts: [`0x${DEPLOYER_PRIVATE_KEY}`], // Using private key instead of mnemonic for vanity deploy
      saveDeployments: true,
    }
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
    admin: {
      default: 1,
    },
    user1: {
      default: 2,
    },
    user2: {
      default: 3,
    },
  },
  solidity: {
    compilers: [
      {
        version: '0.6.12',
        settings: {
          optimizer,
        },
      },
      {
        version: '0.8.0',
        settings: {
          optimizer,
        },
      },
    ],
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  paths: {
    deploy: 'deployments/migrations',
    deployments: 'deployments/artifacts',
  },
};
