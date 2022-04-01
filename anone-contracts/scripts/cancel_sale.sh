#!/bin/bash

NODE="http://65.108.128.139:2281"
ACCOUNT="Developer"
CHAINID="anone-testnet-1"

MARKETPLACE_CONTRACT_ADDR="one19vrjp7fll6a729v464wlxr8a2xqhcddc0e5f0gxkv4fcyl8n23us4mr5jv"
CANCEL_SALE="{\"cancel_sale\": {\"offering_id\": \"1\"}}"
anoned tx wasm execute "$MARKETPLACE_CONTRACT_ADDR" "$CANCEL_SALE" --from "$ACCOUNT" -y --output json --gas="auto" --gas=auto --fees 875000uan1 --node "$NODE" --chain-id="$CHAINID" -y --output json
