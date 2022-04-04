#!/bin/bash

NODE="http://65.108.128.139:2281"
ACCOUNT="Developer"
CHAINID="anone-testnet-1"
SLEEP_TIME="15s"
CONTRACT="one1p4lqunauqgstt6ydszx59y3pg2tkaxlnujl9m5ldz7nqcrn6tjzqhe772z"
RECIPIENT="one1k2x29vppqrhgsdxtkmkpspnawm229lcpec7mm3"
AMOUNT="$1"
TRANSFER="{\"transfer\": {\"recipient\":\"$RECIPIENT\",\"amount\":\"$AMOUNT\"}}"

echo $TRANSFER

RES=$(anoned tx wasm execute "$CONTRACT" "$TRANSFER" --from "$ACCOUNT" -y --output json --chain-id "$CHAINID" --node "$NODE" --gas 35000000 --fees 0uan1 -y --output json)
echo $RES

TXHASH=$(echo $RES | jq -r .txhash)

echo $TXHASH

# sleep for chain to update
sleep "$SLEEP_TIME"

RAW_LOG=$(anoned query tx "$TXHASH" --chain-id "$CHAINID" --node "$NODE" -o json | jq -r .raw_log)

echo $RAW_LOG

BALANCE_S="{\"balance\":{\"address\":\"$(anoned keys show $ACCOUNT -a)\"}}"
BALANCE_SENDER=$(anoned query wasm contract-state smart "$CONTRACT" "$BALANCE_S" --node "$NODE" -o json)

BALANCE_R="{\"balance\":{\"address\":\"$RECIPIENT\"}}"
BALANCE_RECIPIENT=$(anoned query wasm contract-state smart "$CONTRACT" "$BALANCE_R" --node "$NODE" -o json)

echo "BALANCE SENDER = $BALANCE_SENDER"
echo "BALANCE RECIPIENT = $BALANCE_RECIPIENT"