#!/bin/bash

NODE="http://65.108.128.139:2281"
ACCOUNT="Developer"
CHAINID="anone-testnet-1"

MARKETPLACE_CONTRACT_ADDR="one1xhcxq4fvxth2hn3msmkpftkfpw73um7s4et3lh4r8cfmumk3qsmsrx2mwr"

anoned tx wasm execute "$MARKETPLACE_CONTRACT_ADDR" '{
  "withdraw_nft": {
    "offering_id": "1"
  }
}' --from "$ACCOUNT" -y --output json --gas="auto" --gas=auto --fees 875000uan1 --node "$NODE" --chain-id="$CHAINID" -y --output json
