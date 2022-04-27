#!/bin/bash

NODE="http://65.108.128.139:2281"
#ACCOUNT="test"
ACCOUNT="Developer"
CHAINID="anone-testnet-1"
SLEEP_TIME="15s"
CONTRACT="one1t03wt66r7xqszqfwyjhvklyynrk2tyqelhk30u9aga48ajy5kclq0xt3tt"
MARKETPLACE_CONTRACT_ADDR="one15uery5y3vutl3nmv4qh8nrd4cvkty9a44sajc2kf23t9l5hs0jdq8dz6yu"
TOKEN_ID="$1"

REVOKE="{\"revoke\": {\"token_id\":\"$TOKEN_ID\", \"spender\":\"$MARKETPLACE_CONTRACT_ADDR\"}}"

echo $REVOKE

RES=$(anoned tx wasm execute "$CONTRACT" "$REVOKE" --from "$ACCOUNT" -y --output json --chain-id "$CHAINID" --node "$NODE" --gas 35000000 --fees 0uan1 -y --output json)
echo $RES

TXHASH=$(echo $RES | jq -r .txhash)

echo $TXHASH

# sleep for chain to update
sleep "$SLEEP_TIME"

RAW_LOG=$(anoned query tx "$TXHASH" --chain-id "$CHAINID" --node "$NODE" -o json | jq -r .raw_log)

echo $RAW_LOG