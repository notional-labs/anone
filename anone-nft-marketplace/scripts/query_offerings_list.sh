#!/bin/bash

NODE="http://65.108.128.139:2281"
ACCOUNT="Developer"
CHAINID="anone-testnet-1"

MARKETPLACE_CONTRACT_ADDR="one1sc2mtuwqls6mgd5cg2u5mzcfz3jxendjx3smgywu97f9p4ywmsusgsntls"

QUERY="{\"get_offerings\":{\"sort_listing\":\"price_lowest\"}}"
RES=$(anoned query wasm contract-state smart "$MARKETPLACE_CONTRACT_ADDR" "$QUERY" --node "$NODE" --chain-id="$CHAINID" --output json | jq --color-output -r)
echo $RES