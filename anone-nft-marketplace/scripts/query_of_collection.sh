#!/bin/bash

NODE="http://65.108.128.139:2281"
ACCOUNT="Developer"
CHAINID="anone-testnet-1"

MARKETPLACE_CONTRACT_ADDR="one1hkw0czu90estdr04pp4u76treyrkdm7mxuktk593qcs239wrwdnq2dgysh"

QUERY="{\"get_offerings_of_collection\":{\"sort_listing\":\"price_lowest\", \"contract_addr\":\"one1mych7nr7fk86y2ezekkqfwsqpl8ax659ez4r4lm87x6clhz65q9sn4ngte\"}}"
RES=$(anoned query wasm contract-state smart "$MARKETPLACE_CONTRACT_ADDR" "$QUERY" --node "$NODE" --chain-id="$CHAINID" --output json | jq --color-output -r)
echo $RES