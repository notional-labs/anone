#!/bin/bash

NODE="http://65.108.128.139:2281"
ACCOUNT="Developer"
CHAINID="anone-testnet-1"
SLEEP_TIME="5s"

MARKETPLACE_CONTRACT_ADDR="one15v8jqq6aqhsuykdgdevx3qqcj9lp4h27ypsycds4cmv6er9qv0vsc6lyx9"
CANCEL_SALE="{\"withdraw_nft\": {\"offering_id\": \"1\"}}"
RES=$(anoned tx wasm execute "$MARKETPLACE_CONTRACT_ADDR" "$CANCEL_SALE" --from "$ACCOUNT" -y --output json --gas 35000000 --fees 875000uan1 --node "$NODE" --chain-id="$CHAINID" -y --output json)
echo $RES

TXHASH=$(echo $RES | jq -r .txhash)
echo $TXHASH

# sleep for chain to update
sleep "$SLEEP_TIME"

RAW_LOG=$(anoned query tx "$TXHASH" --chain-id "$CHAINID" --node "$NODE" -o json | jq -r .raw_log)

echo $RAW_LOG