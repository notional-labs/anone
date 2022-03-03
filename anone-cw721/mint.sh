#!/bin/bash

NODE="tcp://localhost:2281"
ACCOUNT="test"
CHAINID="anone-testnet-1"
CONTRACT_DIR="artifacts/anone_cw721.wasm"
SLEEP_TIME="15s"
CONTRACT="one1nc5tatafv6eyq7llkr2gv50ff9e22mnf70qgjlv737ktmt4eswrq9jdqcm"
TOKEN_ID="test-1"
MINT="{\"mint\": {\"token_id\":\"$TOKEN_ID\", \"owner\": \"$(anoned keys show $ACCOUNT -a)\", \"token_uri\": \"https://drive.google.com/file/d/1sMElSrt5mXMLwHF_crPs6YfNUg0PMMq2/view?usp=sharing\"}}"

RES=$(anoned tx wasm execute "$CONTRACT" "$MINT" --from "$ACCOUNT" -y --output json --chain-id "$CHAINID" --node "$NODE" --gas 35000000 --fees 875000uan1 -y --output json)
echo $RES

TXHASH=$(echo $RES | jq -r .txhash)

echo $TXHASH

# sleep for chain to update
sleep "$SLEEP_TIME"

RAW_LOG=$(anoned query tx "$TXHASH" --chain-id "$CHAINID" --node "$NODE" -o json | jq -r .raw_log)

echo $RAW_LOG

NAME_QUERY="{\"nft_info\": {\"token_id\": \"$TOKEN_ID\"}}\"
OWNER_OF=$(anoned query wasm contract-state smart "$CONTRACT" "$NAME_QUERY" --node "$NODE" --output json)
echo $OWNER_OF
