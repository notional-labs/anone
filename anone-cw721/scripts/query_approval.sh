#!/bin/bash

NODE="http://65.108.128.139:2281"
#ACCOUNT="test"
ACCOUNT="Developer"
CHAINID="anone-testnet-1"
SLEEP_TIME="15s"
CONTRACT="one1t03wt66r7xqszqfwyjhvklyynrk2tyqelhk30u9aga48ajy5kclq0xt3tt"
MARKETPLACE_CONTRACT_ADDR="one1qje5ufydcpc30mecken3cry77rqh59dcx5m70qfhddwfpahvnvlq2fxzd6"

# CHANGE TOKEN_ID HERE
# $# is to check number of arguments
TOKEN_ID="$1"

QUERY="{\"approval\": {\"token_id\": \"$TOKEN_ID\", \"spender\": \"$MARKETPLACE_CONTRACT_ADDR\"}}"
echo $(anoned query wasm contract-state smart "$CONTRACT" "$QUERY" --node "$NODE" --output json | jq --color-output -r )