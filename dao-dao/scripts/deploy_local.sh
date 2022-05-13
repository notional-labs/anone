#!/bin/bash

# Run this from the root repo directory

## CONFIG
# NOTE: you will need to update these to deploy on different network
IMAGE_TAG=${2:-"v2.3.0-beta.1"} # lupercalia beta - this allows you to pass in an image, e.g. pr-156 as arg 2
CONTAINER_NAME="cosmwasm"
BINARY="docker exec -i $CONTAINER_NAME anoned"
DENOM='uan1'
CHAIN_ID='anone-testnet-1'
RPC='tcp://localhost:2281'
TXFLAG="--gas-prices 0.1$DENOM --gas auto --gas-adjustment 1.5 -y -b block --chain-id $CHAIN_ID --node $RPC"
BLOCK_GAS_LIMIT=${GAS_LIMIT:-100000000} # should mirror mainnet
ACCOUNT="test"
SLEEP_TIME="15s"


# ##### UPLOAD CONTRACTS #####

### CW-DAO ###
CW3_DAO=$(anoned tx wasm store "artifacts/cw3_dao.wasm" --from $ACCOUNT $TXFLAG --output json) 
TXHASH=$(echo $CW3_DAO | jq -r .txhash)
echo $TXHASH
sleep 5
RAW_LOG=$(anoned query tx "$TXHASH" --chain-id "$CHAIN_ID" --node "$RPC" -o json | jq -r .raw_log)
CW3_DAO_CODE=$(echo $RAW_LOG | jq -r .[0].events[1].attributes[0].value)
echo $CW3_DAO_CODE

### STAKE-CW20 ###
STAKE_CW20=$(anoned tx wasm store "artifacts/stake_cw20.wasm" --from $ACCOUNT $TXFLAG --output json)
TXHASH=$(echo $STAKE_CW20 | jq -r .txhash)
echo $TXHASH
sleep 5
RAW_LOG=$(anoned query tx "$TXHASH" --chain-id "$CHAIN_ID" --node "$RPC" -o json | jq -r .raw_log)
STAKE_CW20_CODE=$(echo $RAW_LOG | jq -r .[0].events[1].attributes[0].value)
echo $STAKE_CW20_CODE

KEY=$(anoned keys show $ACCOUNT -a)


# ##### INSTANTIATE CONTRACTS #####

# Instantiate a DAO contract instantiates its own cw20
CW3_DAO_INIT="{
  \"name\": \"DAO\",
  \"description\": \"A DAO that makes DAO tooling\",
  \"gov_token\": {
    \"instantiate_new_cw20\": {
      \"cw20_code_id\": 1,
      \"label\": \"DAO DAO v0.1.1\",
      \"initial_dao_balance\": \"1000000000\",
      \"msg\": {
        \"name\": \"DAO governance token\",
        \"symbol\": \"DAO\",
        \"decimals\": 6,
        \"initial_balances\": [{
          \"address\": \"$KEY\",
          \"amount\": \"10000000\"
        }]
      }
    }
  },
  \"staking_contract\": {
    \"instantiate_new_staking_contract\": {
      \"staking_contract_code_id\": $STAKE_CW20_CODE
    }
  },
  \"threshold\": {
    \"absolute_percentage\": {
        \"percentage\": \"0.5\"
    }
  },
  \"max_voting_period\": {
    \"height\": 100
  },
  \"proposal_deposit_amount\": \"0\",
  \"only_members_execute\": false,
  \"automatically_add_cw20s\": true,
  \"mint_gov_token\": \"1000000\"
}"
echo $CW3_DAO_INIT | jq .

INIT=$(anoned tx wasm instantiate "$CW3_DAO_CODE" "$CW3_DAO_INIT" --from $ACCOUNT --label "DAO DAO" $TXFLAG --output json --no-admin)

CW3_DAO_CONTRACT=$(anoned q wasm list-contract-by-code $CW3_DAO_CODE --output json --node $RPC | jq -r '.contracts[-1]')
echo $CW3_DAO_CONTRACT

# Send some coins to the dao contract to initializae its
# treasury. Unless this is done the DAO will be unable to perform
# actions like executing proposals that require it to pay gas fees.
anoned tx bank send $ACCOUNT $CW3_DAO_CONTRACT 9000000$DENOM --chain-id testing $TXFLAG -y
