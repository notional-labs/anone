#!/bin/bash

NODE="http://65.108.128.139:2281"
ACCOUNT="Developer"
CHAINID="anone-testnet-1"

MARKETPLACE_CONTRACT_ADDR="one1vguuxez2h5ekltfj9gjd62fs5k4rl2zy5hfrncasykzw08rezpfss4pvqr"

anoned tx wasm execute "$MARKETPLACE_CONTRACT_ADDR" '{
  "withdraw_nft": {
    "offering_id": "<INSERT_OFFERING_ID>"
  }
}' --from "$ACCOUNT" -y --output json --gas="auto" --gas=auto --fees 875000uan1 --node "$NODE" --chain-id="$CHAINID" -y --output json
