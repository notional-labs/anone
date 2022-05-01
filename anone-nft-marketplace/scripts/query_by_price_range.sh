#!/bin/bash

NODE="http://65.108.128.139:2281"
ACCOUNT="Developer"
CHAINID="anone-testnet-1"

MARKETPLACE_CONTRACT_ADDR="one1sh9n6msknq5w0psaczat0egrf692xkznmwt4wpnthfwdhryldrzstdqtsz"

QUERY="{\"get_offerings_by_price_range\":{\"sort_listing\":\"price_lowest\", \"min\":\"10000\", \"max\":\"100000000\"}}"
RES=$(anoned query wasm contract-state smart "$MARKETPLACE_CONTRACT_ADDR" "$QUERY" --node "$NODE" --chain-id="$CHAINID" --output json | jq --color-output -r)
echo $RES