#!/bin/bash

NODE="http://65.108.128.139:2281"
ACCOUNT="Developer"
CHAINID="anone-testnet-1"
SLEEP_TIME="15s"
CONTRACT="one146yt0d28x7fg48hn7pmzpyg5g5qhvnkgnkmydptqcg6yucwfwmfsjk92jz"

COLLECTION_INFO_QUERY="{\"collection_info\": {}}"
OWNER_OF=$(anoned query wasm contract-state smart "$CONTRACT" "$COLLECTION_INFO_QUERY" --node "$NODE" --output json)

echo $OWNER_OF