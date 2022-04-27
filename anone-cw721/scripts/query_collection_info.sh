#!/bin/bash

NODE="http://65.108.128.139:2281"
ACCOUNT="Developer"
CHAINID="anone-testnet-1"
SLEEP_TIME="15s"
CONTRACT="one1t03wt66r7xqszqfwyjhvklyynrk2tyqelhk30u9aga48ajy5kclq0xt3tt"

COLLECTION_INFO_QUERY="{\"collection_info\": {}}"
OWNER_OF=$(anoned query wasm contract-state smart "$CONTRACT" "$COLLECTION_INFO_QUERY" --node "$NODE" --output json)

echo $OWNER_OF