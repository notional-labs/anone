#!/bin/bash

NODE="http://65.108.128.139:2281"
ACCOUNT="Developer"
CHAINID="anone-testnet-1"
SLEEP_TIME="15s"
CONTRACT="one1d77dhuvgu2estd9v3vdmhurn8822xazf6clna2xyuwrm20k5yjgqj3097g"

COLLECTION_INFO_QUERY="{\"collection_info\": {}}"
OWNER_OF=$(anoned query wasm contract-state smart "$CONTRACT" "$COLLECTION_INFO_QUERY" --node "$NODE" --output json)

echo $OWNER_OF