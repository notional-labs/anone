#!/bin/bash

NODE="http://65.108.128.139:2281"
#ACCOUNT="Developer"
ACCOUNT="Test"
CHAINID="anone-testnet-1"
SLEEP_TIME="10s"

MARKETPLACE_CONTRACT_ADDR="one1mcy2qkuphhz4h4mncdzrxf3fh57fk98l6m30zfp7lggk4zh407rqq2carw"
INSERT_OFFERING_ID="$1"

BUY_NFT="{\"make_order\": {\"offering_id\": \"$INSERT_OFFERING_ID\"}}"
echo $BUY_NFT

# Execute send action to buy token with the specified offering_id from the marketplace
RES=$(anoned tx wasm execute "$MARKETPLACE_CONTRACT_ADDR" "$BUY_NFT" --from "$ACCOUNT" -y --output json --chain-id "$CHAINID" --node "$NODE" --gas 35000000 --fees 0uan1 --amount 5000000uan1 -y --output json)
echo $RES

TXHASH=$(echo $RES | jq -r .txhash)
echo $TXHASH

# sleep for chain to update
sleep "$SLEEP_TIME"

RAW_LOG=$(anoned query tx "$TXHASH" --chain-id "$CHAINID" --node "$NODE" -o json | jq -r .raw_log)

echo $RAW_LOG