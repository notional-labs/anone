#!/bin/bash

NODE="http://65.108.128.139:2281"
ACCOUNT="Developer"
CHAINID="anone-testnet-1"
SLEEP_TIME="15s"
CONTRACT="one1xmacmeqhdcr5w6qn2jpx8vs6kg3zaql944t4365jdsr8d8m67vns5mamhw"

COLLECTION_INFO_QUERY="{\"collection_info\": {}}"
COLLECTION_INFO=$(anoned query wasm contract-state smart "$CONTRACT" "$COLLECTION_INFO_QUERY" --node "$NODE" --output json)

echo $COLLECTION_INFO