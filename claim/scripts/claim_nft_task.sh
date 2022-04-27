#!/bin/bash

NODE="tcp://localhost:2281"
CHAINID="anone-testnet-1"
SLEEP_TIME="15s"
CLAIM_CONTRACT="one1nc5tatafv6eyq7llkr2gv50ff9e22mnf70qgjlv737ktmt4eswrq9jdqcm"
MINTER_CONTRACT="one17p9rzwnnfxcjp32un9ug7yhhzgtkhvl9jfksztgw5uh69wac2pgsafn93l"


# CHANGE ONLY THIS
SENDER="test"

MSG="{\"claim_mint_nft\": {\"minter_address\": \"$MINTER_CONTRACT\"}}"

echo $MINT

RES=$(anoned tx wasm execute "$CLAIM_CONTRACT" "$MSG" --from "$SENDER" -y --output json --chain-id "$CHAINID" --node "$NODE" --gas 35000000 --fees 1000000uan1 -y --output json)
echo $RES

TXHASH=$(echo $RES | jq -r .txhash)

echo $TXHASH

# sleep for chain to update
sleep "$SLEEP_TIME"

RAW_LOG=$(anoned query tx "$TXHASH" --chain-id "$CHAINID" --node "$NODE" -o json | jq -r .raw_log)

echo $RAW_LOG

