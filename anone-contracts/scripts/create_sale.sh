#!/bin/bash

NODE="http://65.108.128.139:2281"
ACCOUNT="Developer"
CHAINID="anone-testnet-1"
SLEEP_TIME="10s"

MARKETPLACE_CONTRACT_ADDR="one1lqgdq9u8zhcvwwwz3xjswactrtq6qzptmlzlh6xspl34dxq32uhqg24m03"
CW721_CONTRACT_ADDR="one1nc5tatafv6eyq7llkr2gv50ff9e22mnf70qgjlv737ktmt4eswrq9jdqcm"
INSERT_CW20_CONTRACT_ADDR="one1p4lqunauqgstt6ydszx59y3pg2tkaxlnujl9m5ldz7nqcrn6tjzqhe772z"
INSERT_AMOUNT_WITHOUT_DENOM=5000
TOKEN_ID="$1"

# This msg is BASE64_ENCODED_JSON --> { "list_price": { "address": "<INSERT_CW20_CONTRACT_ADDR>", "amount": "<INSERT_AMOUNT_WITHOUT_DENOM>" }} <--
BASE64_ENCODED_JSON="IHsibGlzdF9wcmljZSI6IAogICAgeyAiYWRkcmVzcyI6ICJvbmUxcDRscXVuYXVxZ3N0dDZ5ZHN6eDU5eTNwZzJ0a2F4bG51amw5bTVsZHo3bnFjcm42dGp6cWhlNzcyeiIsCiAgICAiYW1vdW50IjogIjUwMDAifQogfQ=="

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

