DELEGATOR_ADDRESS=$(cat $HOME/.anone/config/genesis.json | jq -r .app_state.genutil.gen_txs[].body.messages[].delegator_address)
VALIDATOR_ADDRESS=$(cat $HOME/.anone/config/genesis.json | jq -r .app_state.genutil.gen_txs[].body.messages[].validator_address)
ETH_ADDRESS="0x159BA6999C7602956d691A54CFaa93563EC8d16B"
echo $DELEGATOR_ADDRESS
echo $VALIDATOR_ADDRESS

# cat $HOME/.anone/config/genesis.json | jq --arg VALIDATOR_ADDRESS $VALIDATOR_ADDRESS '.app_state.gravity.delegate_keys[].validator = $VALIDATOR_ADDRESS'
cat $HOME/.anone/config/genesis.json | jq --arg VALIDATOR_ADDRESS $VALIDATOR_ADDRESS \
 --arg DELEGATOR_ADDRESS $DELEGATOR_ADDRESS \
 --arg ETH_ADDRESS $ETH_ADDRESS \
 '.app_state.gravity.delegate_keys[0] |= . + {"validator": $VALIDATOR_ADDRESS, "orchestrator": $DELEGATOR_ADDRESS, "eth_address": $ETH_ADDRESS}' \
 > $HOME/.anone/config/tmp_genesis.json && mv $HOME/.anone/config/tmp_genesis.json $HOME/.anone/config/genesis.json

cat $HOME/.anone/config/genesis.json | jq -r .app_state.gravity

