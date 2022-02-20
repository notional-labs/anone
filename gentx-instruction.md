## Clone the project
```
git clone https://github.com/notional-labs/anone
```
## Build
```
cd anone
git checkout testnet-1
go install ./...
```

## Set up
If you get an error that genesis.json file already exists, use overwrite flag
```
anoned init -o moniker --chain-id anone-testnet-1
```
If you get an error that 'anoned not found' then your gopath is not setup properly. You can try:
```
export GOPATH=~/go
export PATH=$PATH:~/go/bin
```
Assign yourself a balance, replace "<key-name>" with the name of your keys above
```
anoned add-genesis-account <key-name> 1000000000uan1 --keyring-backend os
```
Define the amount you want to stake, replace "<key-name>" with the name of your keys from step 5
```
anoned gentx <key-name> 1000000uan1 \
--chain-id anone-testnet-1 \
--moniker="<moniker>" \
--commission-max-change-rate=0.01 \
--commission-max-rate=0.20 \
--commission-rate=0.05 \
--details="XXXXXXXX" \
--security-contact="XXXXXXXX" \
--website="XXXXXXXX"
```
You should now get an output like:
```
Genesis transaction written to "~/.anone/config/gentx/gentx-e4987c1bfc4c1135ddfd79ee0114e1212a747da3.json"
```
Copy the gentx file to your local anone repo, use the below command exactly as is
```
cp ~/.anone/config/gentx/* networks/anone-testnet-1/gentxs
```
Submit a Pull Request with your gentx file
