#!/bin/bash

NODE="http://65.108.128.139:2281"
CHAINID="anone-testnet-1"
SLEEP_TIME="15s"
CONTRACT_MINTER="one1tm3f5ph05k0wh02d57zddked4pztczsdxrwp22rq9t7afd7a6dlsu4nng7"
CONTRACT_AN721="one1erul6xyq0gk6ws98ncj7lnq9l4jn4gnnu9we73gdz78yyl2lr7qq7vulp7"


# CHANGE ONLY THIS
OWNER="Test"

MINT="{\"mint\": {}}"

echo $MINT

RES=$(anoned tx wasm execute "$CONTRACT_MINTER" "$MINT" --from "$OWNER" -y --output json --chain-id "$CHAINID" --node "$NODE" --gas 35000000 --fees 0uan1 -y --output json)
echo $RES

TXHASH=$(echo $RES | jq -r .txhash)

echo $TXHASH

# sleep for chain to update
sleep "$SLEEP_TIME"

RAW_LOG=$(anoned query tx "$TXHASH" --chain-id "$CHAINID" --node "$NODE" -o json | jq -r .raw_log)

echo $RAW_LOG

