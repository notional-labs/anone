#!/bin/bash

NODE="http://65.108.128.139:2281"
ACCOUNT="Developer"
CHAINID="anone-testnet-1"
CONTRACT_DIR="artifacts/anone_minter.wasm"
SLEEP_TIME="15s"

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