#!/bin/bash

NODE="http://65.108.128.139:2281"
ACCOUNT="Developer"
#ACCOUNT="one1k2x29vppqrhgsdxtkmkpspnawm229lcpec7mm3"
CHAINID="anone-testnet-1"
SLEEP_TIME="10s"

MARKETPLACE_CONTRACT_ADDR="one1qm8dzr6lyz9swhq98tgejhf9r8usqc64v5arjpf2jtpjs0w5yewqx3hkqs"
CW721_CONTRACT_ADDR="one1mych7nr7fk86y2ezekkqfwsqpl8ax659ez4r4lm87x6clhz65q9sn4ngte"
AMOUNT=5000000
TOKEN_ID="$1"

ALL_NFTS_QUERY="{\"all_tokens\": {}}"
OWNER_OF=$(anoned query wasm contract-state smart "$CW721_CONTRACT_ADDR" "$ALL_NFTS_QUERY" --node "$NODE" --output json)
echo $OWNER_OF

CREATE_SALE="{\"create_sale\": {\"contract_addr\":\"$CW721_CONTRACT_ADDR\", \"token_id\":\"$TOKEN_ID\", \"list_price\": \"5000000\"}}"
echo $CREATE_SALE

RES=$(anoned tx wasm execute "$MARKETPLACE_CONTRACT_ADDR" "$CREATE_SALE" --from "$ACCOUNT" -y --output json --chain-id "$CHAINID" --node "$NODE" --gas 35000000 --fees 875000uan1 -y --output json)
echo $RES

TXHASH=$(echo $RES | jq -r .txhash)
echo $TXHASH

# sleep for chain to update
sleep "$SLEEP_TIME"

RAW_LOG=$(anoned query tx "$TXHASH" --chain-id "$CHAINID" --node "$NODE" -o json | jq -r .raw_log)

echo $RAW_LOG

