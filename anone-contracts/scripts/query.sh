#!/bin/bash

NODE="http://65.108.128.139:2281"
ACCOUNT="Developer"
CHAINID="anone-testnet-1"

MARKETPLACE_CONTRACT_ADDR="one1vguuxez2h5ekltfj9gjd62fs5k4rl2zy5hfrncasykzw08rezpfss4pvqr"

anoned query wasm contract-state smart "$MARKETPLACE_CONTRACT_ADDR" '{"get_offerings":{"sort_listing":"price_lowest", "index": 0, "size": 5 }}' --node "$NODE" --chain-id="$CHAINID" --output json | jq --color-output -r