#!/bin/bash

#NODE="tcp://localhost:2281"
NODE="http://65.108.128.139:2281"
#OWNER="test"
CHAINID="anone-testnet-1"
SLEEP_TIME="15s"
CONTRACT="one10qhsnxrhegp62qm4f56s0jhf4j7cc0enh2y3e9hw03ne27tlv7lq46pxzm"

LATEST=$(bash scripts/query_all.sh | jq -r ".data.tokens | last")
TOKEN_ID=$(($LATEST+1))

# CHANGE ONLY THIS
OWNER="Developer"
TOKEN_URI="https://drive.google.com/file/d/1HpYCJaIB4nEu54V8cPAK1cCiIur9Ua0M/view?usp=sharing"

# EXTENSION DATA
youtube_url="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
animation_url="CHANGE HERE"
background_color="CHANGE HERE"
description="CHANGE HERE"
external_url="CHANGE HERE"
image="CHANGE HERE"
image_data="CHANGE HERE"
name="CHANGE HERE"
EXTENSION="{
    \"youtube_url\":\"$youtube_url\", 
    \"animation_url\":\"$animation_url\", 
    \"background_color\":\"$background_color\", 
    \"description\":\"$description\", 
    \"external_url\":\"$external_url\", 
    \"image\":\"$image\", 
    \"image_data\":\"$image_data\", 
    \"name\":\"$name\"
}"

MINT="{\"mint\": {\"extension\":$EXTENSION, \"token_id\":\"$TOKEN_ID\",  \"token_uri\": \"$TOKEN_URI\", \"owner\":\"$(anoned keys show $OWNER -a)\"}}"

echo $MINT

RES=$(anoned tx wasm execute "$CONTRACT" "$MINT" --from "$OWNER" -y --output json --chain-id "$CHAINID" --node "$NODE" --gas 35000000 --fees 875000uan1 -y --output json)
echo $RES

TXHASH=$(echo $RES | jq -r .txhash)

echo $TXHASH

# sleep for chain to update
sleep "$SLEEP_TIME"

RAW_LOG=$(anoned query tx "$TXHASH" --chain-id "$CHAINID" --node "$NODE" -o json | jq -r .raw_log)

echo $RAW_LOG

NAME_QUERY="{\"nft_info\": {\"token_id\": \"$TOKEN_ID\"}}"
OWNER_OF=$(anoned query wasm contract-state smart "$CONTRACT" "$NAME_QUERY" --node "$NODE" --output json)
echo $OWNER_OF
