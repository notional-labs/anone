```
anoned keys add <validator>
```
If you have validator address before, add `--recover` flag and type your mnemonic  to recover.

Then, go to Faucet channel in Discord to get your token: https://discord.com/channels/908103165143023666/944946627880316938. Fill in youjr address into the chat.

Create a new validator:
```
anoned tx staking create-validator \
  --amount=1000000uan1 \
  --pubkey=$(anoned tendermint show-validator) \
  --moniker=<moniker> \
  --chain-id=anone-testnet-1 \
  --commission-rate="0.10" \
  --commission-max-rate="0.20" \
  --commission-max-change-rate="0.01" \
  --min-self-delegation="1000000" \
  --gas="auto" \
  --gas-prices="0.0025uan1" \
  --from=<validator>
```
