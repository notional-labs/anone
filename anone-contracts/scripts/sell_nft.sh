#!/bin/bash

NODE="http://65.108.128.139:2281"
ACCOUNT="Developer"
CHAINID="anone-testnet-1"
CONTRACT_DIR="artifacts/anone_nft_marketplace.wasm"
SLEEP_TIME="15s"

MARKETPLACE_CONTRACT_ADDR="one1eyfccmjm6732k7wp4p6gdjwhxjwsvje44j0hfx8nkgrm8fs7vqfs6gp6k0"
CW721_CONTRACT_ADDR="one1nc5tatafv6eyq7llkr2gv50ff9e22mnf70qgjlv737ktmt4eswrq9jdqcm"
INSERT_CW20_CONTRACT_ADDR="juno1hthjpmmjdeev6hkgvfzve0r2kvel5ca3ecr3x6y5t5r24xl4jprsy06v5d"
INSERT_AMOUNT_WITHOUT_DENOM=500
TOKEN_ID="$1"

SELL_NFT="{\"sell_nft\": {\"contract\":$MARKETPLACE_CONTRACT_ADDR, \"token_id\":\"$TOKEN_ID\", \"msg\": \"BASE64_ENCODED_JSON --> { \"list_price\": { \"address\": \"$INSERT_CW20_CONTRACT_ADDR\", \"amount\": \"$INSERT_AMOUNT_WITHOUT_DENOM\" }} <--\""
echo $SELL_NFT

RES=$(anoned tx wasm execute "$CW721_CONTRACT_ADDR" "$SELL_NFT" --from "$ACCOUNT" -y --output json --chain-id "$CHAINID" --node "$NODE" --gas="auto" --gas=auto --fees 875000uan1 -y --output json)
echo $RES

TXHASH=$(echo $RES | jq -r .txhash)
echo $TXHASH

