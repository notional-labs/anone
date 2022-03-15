#!/bin/bash

NODE="http://65.108.128.139:2281"
ACCOUNT="Developer"
CHAINID="anone-testnet-1"
SLEEP_TIME="15s"
CONTRACT="one1nc5tatafv6eyq7llkr2gv50ff9e22mnf70qgjlv737ktmt4eswrq9jdqcm"
RECIPIENT="one1k2x29vppqrhgsdxtkmkpspnawm229lcpec7mm3"
TOKEN_ID="$1"
TRANSFER="{\"transfer_nft\": {\"recipient\":\"$RECIPIENT\",\"token_id\":\"$TOKEN_ID\"}}"

echo $TRANSFER

RES=$(anoned tx wasm execute "$CONTRACT" "$TRANSFER" --from "$ACCOUNT" -y --output json --chain-id "$CHAINID" --node "$NODE" --gas 35000000 --fees 875000uan1 -y --output json)
echo $RES

TXHASH=$(echo $RES | jq -r .txhash)

echo $TXHASH

# sleep for chain to update
sleep "$SLEEP_TIME"

RAW_LOG=$(anoned query tx "$TXHASH" --chain-id "$CHAINID" --node "$NODE" -o json | jq -r .raw_log)

echo $RAW_LOG