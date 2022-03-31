#!/bin/bash

NODE="http://65.108.128.139:2281"
ACCOUNT="Developer"
CHAINID="anone-testnet-1"

MARKETPLACE_CONTRACT_ADDR="one1wr6vc3g4caz9aclgjacxewr0pjlre9wl2uhq73rp8mawwmqaczsqf0e622"

anoned tx wasm execute "$MARKETPLACE_CONTRACT_ADDR" '{
  "cancel_sale": {
    "offering_id": "1"
  }
}' --from "$ACCOUNT" -y --output json --gas="auto" --gas=auto --fees 875000uan1 --node "$NODE" --chain-id="$CHAINID" -y --output json
