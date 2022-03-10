
# Create .env file
DEPLOYER_PRIVATE_KEY is eth private key

# Deploy contract to bsc testnet
yarn hardhat deloy --network bsctest

# After deploy successfully, token address is saved in deployments/artifacts/bsctest. It will be used to perform transactions on the cli

# Token infor
yarn hardhat token:infor --network bsctest

# Token mint
yarn hardhat token:mint --address <recipient> --amount <amount> --network bsctest

# Token approve
yarn hardhat token:approve --address <recipient> --amount <amount> --network bsctest

# Check balance 
yarn hardhat token:balance --address <address> --network bsctest

# Check transfer 
yarn hardhat token:transfer --address <address> --amount <transfer_amount> --network bsctest





