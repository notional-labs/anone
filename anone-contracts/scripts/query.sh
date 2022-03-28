#!/bin/bash

NODE="http://65.108.128.139:2281"
ACCOUNT="Developer"
CHAINID="anone-testnet-1"

MARKETPLACE_CONTRACT_ADDR="one1xhcxq4fvxth2hn3msmkpftkfpw73um7s4et3lh4r8cfmumk3qsmsrx2mwr"

anoned query wasm contract-state smart "$MARKETPLACE_CONTRACT_ADDR" '{"get_offerings":{"sort_listing":"price_lowest", "index": 0, "size": 5 }}' --node "$NODE" --chain-id="$CHAINID" --output json | jq --color-output -r