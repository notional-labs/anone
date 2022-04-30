#!/bin/bash

#NODE="tcp://localhost:2281"
NODE="http://65.108.128.139:2281"
#ACCOUNT="test"
ACCOUNT="Developer"
CHAINID="anone-testnet-1"
SLEEP_TIME="15s"
CONTRACT="one1jgee6ue6sp844g7wm46gdc0zkpgllt6yu5huspln23cnzhmslwkqk3qwgq"

# CHANGE TOKEN_ID HERE
# $# is to check number of arguments
TOKEN_ID="$1"

QUERY="{\"all_nft_info\": {\"token_id\": \"$TOKEN_ID\"}}"
echo $(anoned query wasm contract-state smart "$CONTRACT" "$QUERY" --node "$NODE" --output json | jq --color-output -r )