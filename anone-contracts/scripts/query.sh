#!/bin/bash

NODE="http://65.108.128.139:2281"
ACCOUNT="Developer"
CHAINID="anone-testnet-1"

MARKETPLACE_CONTRACT_ADDR="one19vrjp7fll6a729v464wlxr8a2xqhcddc0e5f0gxkv4fcyl8n23us4mr5jv"

QUERY="{\"get_offerings\":{\"sort_listing\":\"price_lowest\", \"index\": 0, \"size\": 5}}"
QUERY_ALL="{}"
RES=$(anoned query wasm contract-state smart "$MARKETPLACE_CONTRACT_ADDR" "$QUERY_ALL" --node "$NODE" --chain-id="$CHAINID" --output json | jq --color-output -r)