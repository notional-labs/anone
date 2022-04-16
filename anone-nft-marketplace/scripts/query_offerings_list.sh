#!/bin/bash

NODE="http://65.108.128.139:2281"
ACCOUNT="Developer"
CHAINID="anone-testnet-1"

MARKETPLACE_CONTRACT_ADDR="one15q2ult9rrmrum5dw2asmw5xy6nu4fhukke8wtz0m7mqd6m3p065qptrcfg"

QUERY="{\"get_offerings\":{\"sort_listing\":\"price_lowest\"}}"
RES=$(anoned query wasm contract-state smart "$MARKETPLACE_CONTRACT_ADDR" "$QUERY" --node "$NODE" --chain-id="$CHAINID" --output json | jq --color-output -r)
echo $RES