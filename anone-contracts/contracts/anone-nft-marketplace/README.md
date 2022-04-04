# Anone NFT Marketplace Smart Contract
The Anone NFT marketplace smart contract provides a platform used for selling and buying CW721 tokens with CW20 tokens. It maintains a list of all current offerings, including the seller's address, the token ID put up for sale, the token list price and the contract address the offerings originated from. This smart contract is not equipped with NFT auction feature but only fixed price NFT. Auction will be further developed.

## Contract Addresses
Contract        | Address                                       
marketplace     | one1lqgdq9u8zhcvwwwz3xjswactrtq6qzptmlzlh6xspl34dxq32uhqg24m03 

## Sell CW721 Token

Puts an NFT token up for sale. The seller needs to be the owner of the token to be able to sell it.

```shell
# Execute send_nft action to put token up for sale for specified list_price on the marketplace
anoned tx wasm execute "$CW721_CONTRACT_ADDR" '{
  "send_nft": {
    "contract": "<MARKETPLACE_CONTRACT_ADDR>",
    "token_id": "<TOKEN_ID>",
    "msg": "BASE64_ENCODED_JSON --> { "list_price": { "address": "<INSERT_CW20_CONTRACT_ADDR>", "amount": "<INSERT_AMOUNT_WITHOUT_DENOM>" }} <--"
  }
}'  --from "$ACCOUNT" -y --output json --gas="auto" --gas=auto --fees 875000uan1 --node "$NODE" --chain-id="$CHAINID" -y --output json
```

### Withdraw CW721 Token Offering

Withdraws an NFT token offering from the global offerings list and returns the NFT token back to its owner. Only the token's owner/seller can withdraw the offering. This will only work after having used `send_nft` on a token.

```shell
# Execute withdraw_nft action to withdraw the token with the specified offering_id from the marketplace
anoned tx wasm execute "$MARKETPLACE_CONTRACT_ADDR" '{
  "withdraw_nft": {
    "offering_id": "<INSERT_OFFERING_ID>"
  }
}' --from "$ACCOUNT" -y --output json --gas="auto" --gas=auto --fees 875000uan1 --node "$NODE" --chain-id="$CHAINID" -y --output json
```

### Buy CW721 Token

Buys an NFT token, transferring funds to the seller and the token to the buyer. This will only work after having used `sell_nft` on a token.

```shell
# Execute send action to buy token with the specified offering_id from the marketplace
anoned tx wasm execute "$CW_20_CONTRACT_ADDR" '{
  "send": {
    "contract": "<MARKETPLACE_CONTRACT_ADDR>",
    "amount": "<INSERT_AMOUNT>",
    "msg": "BASE64_ENCODED_JSON --> { "offering_id": "<INSERT_OFFERING_ID>" } <--"
  }
}'  --from "$ACCOUNT" -y --output json --gas="auto" --gas=auto --fees=875000uan1 --node "$NODE" --chain-id="$CHAINID" -y --output json
```

### Query Offerings

```shell
# Lists offerings sorted by lowest price, sort_listing can be one of following values (price_lowest, price_highest, newest_listed, oldest_listed).

anoned query wasm contract-state smart "$MARKETPLACE_CONTRACT_ADDR" '{"get_offerings":{"sort_listing":"price_lowest" }}' --node "$NODE" --chain-id="$CHAINID" --output json | jq --color-output -r
```
