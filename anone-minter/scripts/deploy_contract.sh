#!/bin/bash

#NODE="tcp://localhost:2281"
NODE="http://65.108.128.139:2281"
#ACCOUNT="test"
ACCOUNT="Developer"
CHAINID="anone-testnet-1"
CONTRACT_DIR="artifacts/anone_minter.wasm"
SLEEP_TIME="15s"

CREATOR=$(anoned keys show $ACCOUNT -a)

INIT="{\"an721_code_id\": 42, \"an721_instantiate_msg\":{\"name\": \"Test Collection\", \"symbol\": \"TEST\", \"minter\": \"$CREATOR\", \"collection_info\": {\"creator\": \"$CREATOR\", \"description\": \"An awesome NFT series\", \"image\": \"ipfs://bafybeigi3bwpvyvsmnbj46ra4hyffcxdeaj6ntfk5jpic5mx27x6ih2qvq/images/1.png\", \"royalty_info\":{\"payment_address\": \"$CREATOR\", \"share\":\"0.1\"}}}, \"base_token_uri\": \"ipfs://bafybeicmnw2cuwjycu3ud2hxpt2pjc6o3tk4laeyzdciebrb4igcdapbs4/galaxyrVSptb\", \"num_tokens\": 5, \"per_address_limit\": 1}"
echo $INIT
INIT_JSON=$(anoned tx wasm instantiate "50" "$INIT" --from "$ACCOUNT" --label "anone-minter" -y --chain-id "$CHAINID" --node "$NODE" --gas 3000000 --fees 100000uan1 -o json)

echo "INIT_JSON = $INIT_JSON"

if [ "$(echo $INIT_JSON | jq -r .raw_log)" != "[]" ]; then
	# exit
	echo "ERROR = $(echo $INIT_JSON | jq .raw_log)"
	exit 1
else
	echo "INSTANTIATE SUCCESS"
fi

# sleep for chain to update
sleep "$SLEEP_TIME"

RAW_LOG=$(anoned query tx "$(echo $INIT_JSON | jq -r .txhash)" --chain-id "$CHAINID" --node "$NODE" --output json | jq -r .raw_log)

echo "RAW_LOG = $RAW_LOG"

CONTRACT_ADDRESS=$(echo $RAW_LOG | jq -r .[0].events[0].attributes[0].value)

echo "CONTRACT ADDRESS = $CONTRACT_ADDRESS"

# anoned query wasm contract-state smart "$CONTRACT_ADDRESS" '{"list_channels": {}}' --chain-id "$CHAINID" --node "$NODE"
