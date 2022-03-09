
# Create .env file and copy from .env.example

# Deploy contract to bsc testnet
yarn hardhat deloy --network bsctest

# Simple wrap batch of data
yarn hardhat wrap --network bsctest

# Verify document store
yarn hardhat store:verify --address [DocumentStore_address] --network bsctest
--address is optional arg

# Issue proof to contract
yarn hardhat store:issue --address [DocumentStore_address] --proof [merkle_root] --network bsctest
--address & --proof are optional args

# Revoke proof 
yarn hardhat store:revoke --address [DocumentStore_address] --proof [merkle_root] --network bsctest
--address & --proof are optional args



