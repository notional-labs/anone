#!/bin/bash

NODE="http://65.108.128.139:2281"
#ACCOUNT="Developer"
ACCOUNT="Test"
CHAINID="anone-testnet-1"
SLEEP_TIME="10s"

MARKETPLACE_CONTRACT_ADDR="one15q2ult9rrmrum5dw2asmw5xy6nu4fhukke8wtz0m7mqd6m3p065qptrcfg"
CW20_CONTRACT_ADDR="one13v6dgzhf9nu4fzdkrc6tpvxxd8eqg546ynjep8cqvl4n27xlvf7sme7ml3"
INSERT_OFFERING_ID="1"
# This msg is BASE64_ENCODED_JSON --> { "offering_id": "<INSERT_OFFERING_ID>" } <--
BASE64_ENCODED_JSON="eyJvZmZlcmluZ19pZCI6ICIxIn0="

AMOUNT="$1"
BUY_NFT="{\"send\": {\"contract\": \"$MARKETPLACE_CONTRACT_ADDR\", \"amount\": \"$AMOUNT\", \"msg\": \"$BASE64_ENCODED_JSON\"}}"
echo $BUY_NFT

# Execute send action to buy token with the specified offering_id from the marketplace
RES=$(anoned tx wasm execute "$CW20_CONTRACT_ADDR" "$BUY_NFT" --from "$ACCOUNT" -y --output json --chain-id "$CHAINID" --node "$NODE" --gas 35000000 --fees 0uan1 -y --output json)
echo $RES

TXHASH=$(echo $RES | jq -r .txhash)
echo $TXHASH

# sleep for chain to update
sleep "$SLEEP_TIME"

RAW_LOG=$(anoned query tx "$TXHASH" --chain-id "$CHAINID" --node "$NODE" -o json | jq -r .raw_log)

echo $RAW_LOG