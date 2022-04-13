#!/bin/bash

#NODE="tcp://localhost:2281"
NODE="http://65.108.128.139:2281"
#ACCOUNT="test"
ACCOUNT="Developer"
CHAINID="anone-testnet-1"
SLEEP_TIME="15s"
CONTRACT="one10qhsnxrhegp62qm4f56s0jhf4j7cc0enh2y3e9hw03ne27tlv7lq46pxzm"

ALL_NFTS_QUERY="{\"all_tokens\": {}}"
OWNER_OF=$(anoned query wasm contract-state smart "$CONTRACT" "$ALL_NFTS_QUERY" --node "$NODE" --output json)

echo $OWNER_OF