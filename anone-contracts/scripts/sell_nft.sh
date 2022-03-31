#!/bin/bash

NODE="http://65.108.128.139:2281"
ACCOUNT="Developer"
CHAINID="anone-testnet-1"
CONTRACT_DIR="artifacts/anone_nft_marketplace.wasm"
SLEEP_TIME="15s"

MARKETPLACE_CONTRACT_ADDR="one1xhcxq4fvxth2hn3msmkpftkfpw73um7s4et3lh4r8cfmumk3qsmsrx2mwr"
CW721_CONTRACT_ADDR="one1nc5tatafv6eyq7llkr2gv50ff9e22mnf70qgjlv737ktmt4eswrq9jdqcm"
INSERT_CW20_CONTRACT_ADDR="juno1hthjpmmjdeev6hkgvfzve0r2kvel5ca3ecr3x6y5t5r24xl4jprsy06v5d"
INSERT_AMOUNT_WITHOUT_DENOM=500
TOKEN_ID="$1"
BASE64_ENCODED_JSON="IHsibGlzdF9wcmljZSI6IAogICAgeyAiYWRkcmVzcyI6ICJqdW5vMWh0aGpwbW1qZGVldjZoa2d2Znp2ZTByMmt2ZWw1Y2EzZWNyM3g2eTV0NXIyNHhsNGpwcnN5MDZ2NWQiLAogICAgImFtb3VudCI6ICI1MDAifQogfQ=="

SELL_NFT="{\"send_nft\": {\"contract\":$MARKETPLACE_CONTRACT_ADDR, \"token_id\":\"$TOKEN_ID\", \"msg\": \"$BASE64_ENCODED_JSON\"}}"
echo $SELL_NFT

RES=$(anoned tx wasm execute "$CW721_CONTRACT_ADDR" "$SELL_NFT" --from "$ACCOUNT" -y --output json --chain-id "$CHAINID" --node "$NODE" --gas="auto" --gas=auto --fees 875000uan1 -y --output json)
echo $RES

TXHASH=$(echo $RES | jq -r .txhash)
echo $TXHASH

