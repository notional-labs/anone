#!/bin/bash

#NODE="tcp://localhost:2281"
NODE="http://65.108.128.139:2281"
#ACCOUNT="test"
ACCOUNT="Developer"
CHAINID="anone-testnet-1"
SLEEP_TIME="15s"
CONTRACT="one1tj748034gl3zvujn2tz4p4m8rf9j9uarsj5j3c5a5z2neqel77cslz2lp0"

ALL_MODELS_QUERY="{\"all_models\": {}}"
OWNER_OF=$(anoned query wasm contract-state smart "$CONTRACT" "$ALL_MODELS_QUERY" --node "$NODE" --output json)

echo $OWNER_OF