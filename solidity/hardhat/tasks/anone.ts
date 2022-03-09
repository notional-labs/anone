import { task } from 'hardhat/config';
import { BigNumber, constants, ethers, utils } from 'ethers';


task('store:verify', 'verify school identify')
  .addOptionalParam('address', 'address of user')
  .setAction(async (taskArgs, hre) => {
    const { getNamedAccounts, web3, deployments } = hre;
    const { deployer } = await getNamedAccounts();
    let { address } = taskArgs;

    const DocumentStore = await deployments.get('DocumentStore');

    address = address || DocumentStore.address;
    const registry = require('../../registry/registry.json');

    if (address in registry.issuers) {
      console.log(true);
    } else {
      console.log(false);
    }
  });

  task('token:info', 'token info')
  .setAction(async (taskArgs, hre) => {
    const { deployments, getNamedAccounts, web3, artifacts, getChainId } = hre;
    const { deployer } = await getNamedAccounts();

    const AnoneToken = await deployments.get('AnoneToken');
    const tokenInstance = new web3.eth.Contract(AnoneToken.abi, AnoneToken.address);
    console.log(`Using Token @ ${tokenInstance.options.address}`);
    console.log(`Token symbol: ${await tokenInstance.methods.symbol().call()}`);
    console.log(`Deployer balances: ${await tokenInstance.methods.balanceOf(deployer).call()}`);
  });

task('token:mint', 'token new')
  .setAction(async (taskArgs, hre) => {
    const { deployments, getNamedAccounts, web3, artifacts } = hre;
    const { deployer } = await getNamedAccounts();

    const AnoneToken = await deployments.get('AnoneToken');
    const tokenInstance = new web3.eth.Contract(AnoneToken.abi, AnoneToken.address);

    await tokenInstance.methods
      .mint(deployer, ethers.utils.parseEther('1000000000').toString())
      .send({ from: deployer });

      console.log(`Using Token @ ${tokenInstance.options.address}`);
      console.log(`Token symbol: ${await tokenInstance.methods.symbol().call()}`);
      console.log(`Deployer balances: ${await tokenInstance.methods.balanceOf(deployer).call()}`);
  });

task('token:approve', 'btoken info')
  .addParam('spender', 'spender')
  .setAction(async (taskArgs, hre) => {
    const { deployments, getNamedAccounts, web3, artifacts, getChainId } = hre;
    const { deployer } = await getNamedAccounts();
    const { spender } = taskArgs;

    const AnoneToken = await deployments.get('AnoneToken');
    const tokenInstance = new web3.eth.Contract(AnoneToken.abi, AnoneToken.address);
    const txn = await tokenInstance.methods
        .approve(spender, constants.MaxUint256.toString())
        .send({ from: deployer });
      console.log(`Approved, tx: ${txn.transactionHash}`);
  });

task('token:balance', 'balancer of user')
.addParam('address', 'address')
  .setAction(async (taskArgs, hre) => {
    const { deployments, getNamedAccounts, web3, artifacts, getChainId } = hre;
    const { address } = taskArgs;

    const AnoneToken = await deployments.get('AnoneToken');
    const tokenInstance = new web3.eth.Contract(AnoneToken.abi, AnoneToken.address);
    console.log(`Using BToken @ ${tokenInstance.options.address}`);
    const balance = await tokenInstance.methods.balanceOf(address).call();
    const totalSupply = await tokenInstance.methods.totalSupply().call();
    console.log(`total supply: ${totalSupply}`);
    console.log(`balance of ${address} : ${balance}`);

  });

// task('token:allowance', 'balancer of user')
//   .addOptionalParam('tokens', 'token list')
//   .setAction(async (taskArgs, hre) => {
//     const { deployments, getNamedAccounts, web3, artifacts, getChainId } = hre;
//     const { deployer } = await getNamedAccounts();
//     const { user1 } = await getNamedAccounts();
//     const { user2 } = await getNamedAccounts();
//     const chainId = await getChainId();

//     const tokens = taskArgs.tokens?.splits(',') || ADDRESSES_FOR_NETWORK[chainId]?.tokens || [];

//     for (let tokenAddress of tokens) {
//       const BToken = await artifacts.readArtifact('BToken');
//       const tokenInstance = new web3.eth.Contract(BToken.abi, tokenAddress);
//       console.log(`Using BToken @ ${tokenInstance.options.address}`);
//       const allowance = await tokenInstance.methods
//         .allowance('0xBF56B6f805C29c86f9bEC3644F59C50b92A02151', '0x32B9424c88FDB310f38b7FbC569f45aF2b3F0b54')
//         .call();
//       console.log(`allowance : ${allowance}`);
//     }
//   });

// task('token:transfer', 'balancer of user')
//   .addOptionalParam('tokens', 'token list')
//   .setAction(async (taskArgs, hre) => {
//     const { deployments, getNamedAccounts, web3, artifacts, getChainId } = hre;
//     const { deployer } = await getNamedAccounts();
//     const { user1 } = await getNamedAccounts();
//     const chainId = await getChainId();

//     const tokens = taskArgs.tokens?.splits(',') || ADDRESSES_FOR_NETWORK[chainId]?.tokens || [];

//     for (let tokenAddress of tokens) {
//       const BToken = await artifacts.readArtifact('BToken');
//       const tokenInstance = new web3.eth.Contract(BToken.abi, tokenAddress);
//       console.log(`Using BToken @ ${tokenInstance.options.address}`);
//       const tx = await tokenInstance.methods
//         .transfer('0xda76D268fCA686A6cd55D6e54aCA0A31e8583629', ethers.utils.parseEther('1000000').toString())
//         .send({ from: deployer });
//       console.log(`transfered: ${tx.transactionHash}`);
//     }
//   });

// task('token:verify', 'verify contract')
//   .addOptionalParam('address', 'address')
//   .addOptionalParam('symbol', 'symbol')
//   .setAction(async (taskArgs, hre) => {
//     const symbol = taskArgs.symbol || 'vUSD';
//     const address = taskArgs.address || '0x9CcE0aF49aA2f6362809dd4C4188Bc2665d4033d';
//     await hre.run('verify:verify', {
//       address,
//       constructorArguments: ['0x32b9424c88fdb310f38b7fbc569f45af2b3f0b54', '500000000000000000', '10000'],
//     });
//   });