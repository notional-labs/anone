
NODE="http://65.108.128.139:2281"
ACCOUNT="Developer"
#ACCOUNT="one1k2x29vppqrhgsdxtkmkpspnawm229lcpec7mm3"
CHAINID="anone-testnet-1"
SLEEP_TIME="15s"
CONTRACT="one13v6dgzhf9nu4fzdkrc6tpvxxd8eqg546ynjep8cqvl4n27xlvf7sme7ml3"

BALANCE="{\"balance\":{\"address\":\"$(anoned keys show $ACCOUNT -a)\"}}"
BALANCE_QUERY=$(anoned query wasm contract-state smart "$CONTRACT" "$BALANCE" --node "$NODE" -o json)

echo "BALANCE OF $ACCOUNT = $BALANCE_QUERY"