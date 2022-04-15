#!/bin/bash

NODE="http://65.108.128.139:2281"
ACCOUNT="Developer"
CHAINID="anone-testnet-1"
SLEEP_TIME="15s"
CONTRACT="one1mych7nr7fk86y2ezekkqfwsqpl8ax659ez4r4lm87x6clhz65q9sn4ngte"

COLLECTION_INFO_QUERY="{\"collection_info\": {}}"
OWNER_OF=$(anoned query wasm contract-state smart "$CONTRACT" "$COLLECTION_INFO_QUERY" --node "$NODE" --output json)

echo $OWNER_OF