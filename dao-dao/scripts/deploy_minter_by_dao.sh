#!/bin/bash

# Run this from the root repo directory

## CONFIG
# NOTE: you will need to update these to deploy on different network
IMAGE_TAG=${2:-"v2.3.0-beta.1"} # lupercalia beta - this allows you to pass in an image, e.g. pr-156 as arg 2
CONTAINER_NAME="cosmwasm"
BINARY="docker exec -i $CONTAINER_NAME anoned"
DENOM='uan1'
CHAIN_ID='anone-testnet-1'
RPC='tcp://localhost:2281'
TXFLAG="--gas-prices 0.1$DENOM --gas auto --gas-adjustment 1.5 -y -b block --chain-id $CHAIN_ID --node $RPC"
BLOCK_GAS_LIMIT=${GAS_LIMIT:-100000000} # should mirror mainnet
ACCOUNT="test"
SLEEP_TIME="15s"
DAO_ADDRESS=""

# ##### DEPLOY COLLECTION #####

# Instantiate a DAO contract instantiates its own cw20
INIT="{\"an721_code_id\": 42, \"an721_instantiate_msg\":{\"name\": \"Test Collection\", \"symbol\": \"TEST\", \"minter\": \"$CREATOR\", \"collection_info\": {\"creator\": \"$CREATOR\", \"description\": \"An awesome NFT series\", \"image\": \"ipfs://bafybeigi3bwpvyvsmnbj46ra4hyffcxdeaj6ntfk5jpic5mx27x6ih2qvq/images/1.png\", \"royalty_info\":{\"payment_address\": \"$CREATOR\", \"share\":\"0.1\"}}}, \"base_token_uri\": \"ipfs://bafybeicmnw2cuwjycu3ud2hxpt2pjc6o3tk4laeyzdciebrb4igcdapbs4/galaxyrVSptb\", \"num_tokens\": 5, \"per_address_limit\": 1}"

echo $CW3_DAO_INIT | jq .

INIT=$(anoned tx wasm execute "$DAO_ADDRESS" "$INIT" --from $ACCOUNT --label "DAO DAO" $TXFLAG --output json)

CW3_DAO_CONTRACT=$(anoned q wasm list-contract-by-code $CW3_DAO_CODE --output json --node $RPC | jq -r '.contracts[-1]')
echo $CW3_DAO_CONTRACT

# Send some coins to the dao contract to initializae its
# treasury. Unless this is done the DAO will be unable to perform
# actions like executing proposals that require it to pay gas fees.
anoned tx bank send $ACCOUNT $CW3_DAO_CONTRACT 9000000$DENOM --chain-id testing $TXFLAG -y
