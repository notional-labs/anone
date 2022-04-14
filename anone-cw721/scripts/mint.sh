#!/bin/bash

#NODE="tcp://localhost:2281"
NODE="http://65.108.128.139:2281"
#OWNER="test"
CHAINID="anone-testnet-1"
SLEEP_TIME="15s"
CONTRACT="one1d77dhuvgu2estd9v3vdmhurn8822xazf6clna2xyuwrm20k5yjgqj3097g"

LATEST=$(bash scripts/query_all_nfts.sh | jq -r ".data.tokens | last")
TOKEN_ID=$(($LATEST+1))

# CHANGE ONLY THIS
OWNER="Developer"
TOKEN_URI="https://drive.google.com/file/d/1HpYCJaIB4nEu54V8cPAK1cCiIur9Ua0M/view?usp=sharing"

MINT="{\"mint\": {\"token_id\":\"$TOKEN_ID\",  \"token_uri\": \"$TOKEN_URI\", \"owner\":\"$(anoned keys show $OWNER -a)\"}}"

echo $MINT

RES=$(anoned tx wasm execute "$CONTRACT" "$MINT" --from "$OWNER" -y --output json --chain-id "$CHAINID" --node "$NODE" --gas 35000000 --fees 875000uan1 -y --output json)
echo $RES

TXHASH=$(echo $RES | jq -r .txhash)

echo $TXHASH

# sleep for chain to update
sleep "$SLEEP_TIME"

RAW_LOG=$(anoned query tx "$TXHASH" --chain-id "$CHAINID" --node "$NODE" -o json | jq -r .raw_log)

echo $RAW_LOG

NAME_QUERY="{\"nft_info\": {\"token_id\": \"$TOKEN_ID\"}}"
OWNER_OF=$(anoned query wasm contract-state smart "$CONTRACT" "$NAME_QUERY" --node "$NODE" --output json)
echo $OWNER_OF
