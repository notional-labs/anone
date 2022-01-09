#!/bin/bash

KEY="test"
CHAINID="anoned_1711_1"
KEYRING="test"
MONIKER="localtestnet"
KEYALGO="eth_secp256k1"

# retrieve all args
WILL_RECOVER=0
WILL_INSTALL=0
# $# is to check number of arguments
if [ $# -gt 0 ];
then
    # $@ is for getting list of arguments
    for arg in "$@"; do
        case $arg in
        --recover)
            WILL_RECOVER=1
            shift
            ;;
        --install)
            WILL_INSTALL=1
            shift
            ;;
        *)
            echo >&2 "wrong argument somewhere"; exit 1;
            ;;
        esac
    done
fi

# validate dependencies are installed
command -v jq > /dev/null 2>&1 || { echo >&2 "jq not installed. More info: https://stedolan.github.io/jq/download/"; exit 1; }

# install anoned if not exist
if [ $WILL_INSTALL -eq 0 ];
then 
    command -v anoned > /dev/null 2>&1 || { echo >&1 "installing anoned"; cd cmd/anoned; go install; }
else
    echo >&1 "installing anoned"
    rm $HOME/go/bin/anoned
    rm -rf $HOME/.anone*
    cd cmd/anoned
    go install
fi

anoned config keyring-backend $KEYRING
anoned config chain-id $CHAINID

# determine if user wants to recorver or create new
if [ $WILL_RECOVER -eq 0 ];
then
    anoned keys add $KEY --keyring-backend $KEYRING --algo $KEYALGO
else
    anoned keys add $KEY --keyring-backend $KEYRING --algo $KEYALGO --recover
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