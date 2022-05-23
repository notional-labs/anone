#!/bin/bash

NODE="http://65.108.128.139:2281"
#ACCOUNT="Developer"
ACCOUNT="wallet-test"
CHAINID="anone-testnet-1"
SLEEP_TIME="15s"

MARKETPLACE_CONTRACT_ADDR="one1hkw0czu90estdr04pp4u76treyrkdm7mxuktk593qcs239wrwdnq2dgysh"
OFFERING_ID="$1"
CANCEL_SALE="{\"withdraw_nft\": {\"offering_id\": \"$OFFERING_ID\"}}"
RES=$(anoned tx wasm execute "$MARKETPLACE_CONTRACT_ADDR" "$CANCEL_SALE" --from "$ACCOUNT" -y --output json --gas 35000000 --fees 0uan1 --node "$NODE" --chain-id="$CHAINID" -y --output json)
echo $RES

TXHASH=$(echo $RES | jq -r .txhash)
echo $TXHASH

# sleep for chain to update
sleep "$SLEEP_TIME"

RAW_LOG=$(anoned query tx "$TXHASH" --chain-id "$CHAINID" --node "$NODE" -o json | jq -r .raw_log)

echo $RAW_LOG