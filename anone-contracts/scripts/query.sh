#!/bin/bash

NODE="http://65.108.128.139:2281"
ACCOUNT="Developer"
CHAINID="anone-testnet-1"

MARKETPLACE_CONTRACT_ADDR="one15v8jqq6aqhsuykdgdevx3qqcj9lp4h27ypsycds4cmv6er9qv0vsc6lyx9"

QUERY="{\"get_offerings\":{\"sort_listing\":\"price_lowest\"}}"
RES=$(anoned query wasm contract-state smart "$MARKETPLACE_CONTRACT_ADDR" "$QUERY" --node "$NODE" --chain-id="$CHAINID" --output json | jq --color-output -r)