#!/bin/bash

NODE="http://65.108.128.139:2281"
ACCOUNT="Developer"
#ACCOUNT="one1k2x29vppqrhgsdxtkmkpspnawm229lcpec7mm3"
CHAINID="anone-testnet-1"
SLEEP_TIME="10s"

MARKETPLACE_CONTRACT_ADDR="one15q2ult9rrmrum5dw2asmw5xy6nu4fhukke8wtz0m7mqd6m3p065qptrcfg"
CW721_CONTRACT_ADDR="one1nda8ud7zuzj4342vr5jxfj0fpqfwlle6cy8xgp0r5am26rdmgwrqrm3jkj"
CW20_CONTRACT_ADDR="one13v6dgzhf9nu4fzdkrc6tpvxxd8eqg546ynjep8cqvl4n27xlvf7sme7ml3"
AMOUNT_WITHOUT_DENOM=500000
TOKEN_ID="$1"

# This msg is BASE64_ENCODED_JSON --> { "list_price": { "address": "<INSERT_CW20_CONTRACT_ADDR>", "amount": "<INSERT_AMOUNT_WITHOUT_DENOM>" }} <--
BASE64_ENCODED_JSON="IHsibGlzdF9wcmljZSI6IAogICAgeyAiYWRkcmVzcyI6ICJvbmUxM3Y2ZGd6aGY5bnU0Znpka3JjNnRwdnh4ZDhlcWc1NDZ5bmplcDhjcXZsNG4yN3hsdmY3c21lN21sMyIsCiAgICAiYW1vdW50IjogIjUwMDAwMCJ9CiB9"

ALL_NFTS_QUERY="{\"all_tokens\": {}}"
OWNER_OF=$(anoned query wasm contract-state smart "$CW721_CONTRACT_ADDR" "$ALL_NFTS_QUERY" --node "$NODE" --output json)
echo $OWNER_OF

SEND_NFT="{\"send_nft\": {\"contract\":\"$MARKETPLACE_CONTRACT_ADDR\", \"token_id\":\"$TOKEN_ID\", \"msg\": \"$BASE64_ENCODED_JSON\"}}"
echo $SEND_NFT

RES=$(anoned tx wasm execute "$CW721_CONTRACT_ADDR" "$SEND_NFT" --from "$ACCOUNT" -y --output json --chain-id "$CHAINID" --node "$NODE" --gas 35000000 --fees 875000uan1 -y --output json)
echo $RES

TXHASH=$(echo $RES | jq -r .txhash)
echo $TXHASH

# sleep for chain to update
sleep "$SLEEP_TIME"

RAW_LOG=$(anoned query tx "$TXHASH" --chain-id "$CHAINID" --node "$NODE" -o json | jq -r .raw_log)

echo $RAW_LOG

