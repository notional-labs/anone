#!/bin/bash

#NODE="tcp://localhost:2281"
NODE="http://65.108.128.139:2281"
#ACCOUNT="test"
ACCOUNT="Developer"
CHAINID="anone-testnet-1"
SLEEP_TIME="15s"
CONTRACT="one146yt0d28x7fg48hn7pmzpyg5g5qhvnkgnkmydptqcg6yucwfwmfsjk92jz"

ALL_NFTS_QUERY="{\"all_tokens\": {}}"
OWNER_OF=$(anoned query wasm contract-state smart "$CONTRACT" "$ALL_NFTS_QUERY" --node "$NODE" --output json)

echo $OWNER_OF