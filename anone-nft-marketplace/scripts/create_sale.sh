#!/bin/bash

NODE="http://65.108.128.139:2281"
#ACCOUNT="Developer"
ACCOUNT="one1k2x29vppqrhgsdxtkmkpspnawm229lcpec7mm3"
CHAINID="anone-testnet-1"
SLEEP_TIME="15s"

MARKETPLACE_CONTRACT_ADDR="one1hkw0czu90estdr04pp4u76treyrkdm7mxuktk593qcs239wrwdnq2dgysh"
CW721_CONTRACT_ADDR="one1mych7nr7fk86y2ezekkqfwsqpl8ax659ez4r4lm87x6clhz65q9sn4ngte"
AMOUNT_WITHOUT_DENOM=5000000
TOKEN_ID="$1"

# This msg is BASE64_ENCODED_JSON --> { "list_price": "<AMOUNT_WITHOUT_DENOM>"} <--
BASE64_ENCODED_JSON="IHsibGlzdF9wcmljZSI6IjUwMDAwMDAifQ=="

ALL_NFTS_QUERY="{\"all_tokens\": {}}"
OWNER_OF=$(anoned query wasm contract-state smart "$CW721_CONTRACT_ADDR" "$ALL_NFTS_QUERY" --node "$NODE" --output json)
echo $OWNER_OF

SEND_NFT="{\"send_nft\": {\"contract\":\"$MARKETPLACE_CONTRACT_ADDR\", \"token_id\":\"$TOKEN_ID\", \"msg\": \"$BASE64_ENCODED_JSON\"}}"
echo $SEND_NFT

RES=$(anoned tx wasm execute "$CW721_CONTRACT_ADDR" "$SEND_NFT" --from "$ACCOUNT" -y --output json --chain-id "$CHAINID" --node "$NODE" --gas 35000000 --fees 0uan1 -y --output json)
echo $RES

TXHASH=$(echo $RES | jq -r .txhash)
echo $TXHASH

# sleep for chain to update
sleep "$SLEEP_TIME"

RAW_LOG=$(anoned query tx "$TXHASH" --chain-id "$CHAINID" --node "$NODE" -o json | jq -r .raw_log)

echo $RAW_LOG

