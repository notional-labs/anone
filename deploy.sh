#!/bin/bash

KEY="test"
CHAINID="anoned_1711_1"
KEYRING="test"
MONIKER="localtestnet"
KEYALGO="eth_secp256k1"

# validate dependencies are installed
command -v jq > /dev/null 2>&1 || { echo >&2 "jq not installed. More info: https://stedolan.github.io/jq/download/"; exit 1; }

# install anoned if not exist
command -v anoned > /dev/null 2>&1 || { echo >&1 "installing anoned"; cd cmd/anoned; go install; }

anoned config keyring-backend $KEYRING
anoned config chain-id $CHAINID

# determine if user wants to recorver or create new
# $# is to check number of arguments
if [ $# -eq 0 ]; 
then
    anoned keys add $KEY --keyring-backend $KEYRING --algo $KEYALGO
else
    # $@ is for getting list of arguments
    for arg in "$@"; do
        case $arg in
        --recover)
            anoned keys add $KEY --keyring-backend $KEYRING --algo $KEYALGO --recover
            shift # Remove --skip-verification from `$@`
            ;;
        *)
            echo >&2 "wrong argument somewhere"; exit 1;
            ;;
        esac
    done
fi

# init chain
anoned init $MONIKER --chain-id $CHAINID

# Allocate genesis accounts (cosmos formatted addresses)
anoned add-genesis-account $KEY 100000000000000000000000000uone --keyring-backend $KEYRING

# Sign genesis transaction
anoned gentx $KEY 1000000000000000000000uone --keyring-backend $KEYRING --chain-id $CHAINID

# Collect genesis tx
anoned collect-gentxs

# Run this to ensure everything worked and that the genesis file is setup correctly
anoned validate-genesis

if [[ $1 == "pending" ]]; then
  echo "pending mode is on, please wait for the first block committed."
fi

# Start the node (remove the --pruning=nothing flag if historical queries are not needed)
anoned start --pruning=nothing --evm.tracer=json $TRACE --log_level $LOGLEVEL --minimum-gas-prices=0.0001uone --json-rpc.api eth,txpool,personal,net,debug,web3,miner