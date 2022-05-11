#!/bin/bash

NODE="http://65.108.128.139:2281"
CHAINID="anone-testnet-1"
SLEEP_TIME="15s"
CONTRACT="one1xmacmeqhdcr5w6qn2jpx8vs6kg3zaql944t4365jdsr8d8m67vns5mamhw"

# CHANGE ONLY THIS
OWNER="Developer"
MODIFY="{\"modify_collection_info\": {\"description\":\"Test3\", \"image\":\"ipfs://bafybeigi3bwpvyvsmnbj46ra4hyffcxdeaj6ntfk5jpic5mx27x6ih2qvq/images/1.png\",  \"external_link\": \"123\", \"royalty_info\":{\"payment_address\": \"one1k2x29vppqrhgsdxtkmkpspnawm229lcpec7mm3\", \"share\":\"0.05\"}}}"

echo $MODIFY

RES=$(anoned tx wasm execute "$CONTRACT" "$MODIFY" --from "$OWNER" -y --output json --chain-id "$CHAINID" --node "$NODE" --gas 35000000 --fees 0uan1 -y --output json)
echo $RES

TXHASH=$(echo $RES | jq -r .txhash)

echo $TXHASH

# sleep for chain to update
sleep "$SLEEP_TIME"

RAW_LOG=$(anoned query tx "$TXHASH" --chain-id "$CHAINID" --node "$NODE" -o json | jq -r .raw_log)

echo $RAW_LOG

COLLECTION_INFO_QUERY="{\"collection_info\": {}}"
COLLECTION_INFO=$(anoned query wasm contract-state smart "$CONTRACT" "$COLLECTION_INFO_QUERY" --node "$NODE" --output json)

echo $COLLECTION_INFO
