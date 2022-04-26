#!/bin/bash

NODE="tcp://localhost:2281"
# NODE="http://65.108.128.139:2281"
ACCOUNT="test"
# ACCOUNT="Developer"
CHAINID="anone-testnet-1"
CONTRACT_DIR="artifacts/claim.wasm"
SLEEP_TIME="15s"

CREATOR=$(anoned keys show $ACCOUNT -a)


RES=$(anoned tx wasm store "$CONTRACT_DIR" --from "$ACCOUNT" -y --output json --chain-id "$CHAINID" --node "$NODE" --gas 75000000 --fees 875000uan1 -y --output json)
echo $RES

if [ "$(echo $RES | jq -r .raw_log)" != "[]" ]; then
	# exit
	echo "ERROR = $(echo $RES | jq .raw_log)"
	exit 1
else
	echo "STORE SUCCESS"
fi

TXHASH=$(echo $RES | jq -r .txhash)

echo $TXHASH

# sleep for chain to update
sleep "$SLEEP_TIME"

RAW_LOG=$(anoned query tx "$TXHASH" --chain-id "$CHAINID" --node "$NODE" -o json | jq -r .raw_log)

echo $RAW_LOG

CODE_ID=$(echo $RAW_LOG | jq -r .[0].events[1].attributes[0].value)

echo $CODE_ID
CREATOR=$(anoned keys show $ACCOUNT -a)
INIT_JSON=$(anoned tx wasm instantiate "$CODE_ID" {} --from "$ACCOUNT" --label "claim airdrop contract" -y --chain-id "$CHAINID" --node "$NODE" --gas 3000000 --fees 100000uan1 -o json)

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